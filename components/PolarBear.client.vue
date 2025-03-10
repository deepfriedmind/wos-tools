<script setup lang="ts">
const { size = 128 } = defineProps<{
  size?: number
}>()

const { x: mouseX, y: mouseY } = useMouse()
const container = ref<HTMLDivElement>()
const leftEyeGroup = ref<SVGGElement>()
const rightEyeGroup = ref<SVGGElement>()
const leftGleam = ref<SVGCircleElement>()
const rightGleam = ref<SVGCircleElement>()
let animationFrameId: number

// SVG viewBox dimensions
const SVG_WIDTH = 128
const SVG_HEIGHT = 128

const MAX_EYE_MOVEMENT = 4

// Ear constants
const LEFT_EAR_X = 30
const LEFT_EAR_Y = 38
const RIGHT_EAR_X = 98
const RIGHT_EAR_Y = 38
const EAR_OUTER_RADIUS = 17
const EAR_INNER_RADIUS = 12
const EAR_STROKE_WIDTH = 2

// Head constants
const HEAD_X = 64
const HEAD_Y = 64
const HEAD_RADIUS = 50

// Eye center positions for accurate tracking
const LEFT_EYE_X = 50
const LEFT_EYE_Y = 52
const RIGHT_EYE_X = 78
const RIGHT_EYE_Y = 52
const EYE_ELLIPSE_RX = 10
const EYE_ELLIPSE_RY = 11
const PUPIL_RADIUS = 6
const GLEAM_RADIUS = 1.2
const LEFT_GLEAM_X = 51
const LEFT_GLEAM_Y = 51
const RIGHT_GLEAM_X = 79
const RIGHT_GLEAM_Y = 51

// Blinking constants
const LEFT_BLINK_X1 = 44
const LEFT_BLINK_X2 = 60
const LEFT_BLINK_Y = 52
const RIGHT_BLINK_X1 = 68
const RIGHT_BLINK_X2 = 84
const RIGHT_BLINK_Y = 52
const BLINK_STROKE_WIDTH = 2.5

// Nose constants
const NOSE_POINTS = '62.5,71 65.5,71 64,73'
const NOSE_STROKE_WIDTH = 14

// Mouth constants
const MOUTH_X1 = 50
const MOUTH_X2 = 78
const MOUTH_Y = 84
const MOUTH_STROKE_WIDTH = 2

// Tongue constants
const TONGUE_LEFT_X = 58
const TONGUE_RIGHT_X = 70
const TONGUE_TOP_Y = 84
const TONGUE_GROOVE_X = 64
const TONGUE_GROOVE_BASE_Y = 96
const TONGUE_BASE_Y = 94
const TONGUE_CURVE_Y = 100
const TONGUE_STROKE_WIDTH = 1.5
const TONGUE_GROOVE_STROKE_WIDTH = 1

// Tongue animation state
const tongueExtension = ref(0)
const TONGUE_EXTENSION_VALUE = 6
const MIN_INTERVAL = 6000
const MAX_INTERVAL = 12_000
const ANIMATION_DURATION = 500
let tongueTimeoutId: NodeJS.Timeout

// Blinking animation state
const isBlinking = ref(false)
const BLINK_MIN_INTERVAL = 6000
const BLINK_MAX_INTERVAL = 12_000
const BLINK_DURATION = 120
const DOUBLE_BLINK_CHANCE = 0.2
const DOUBLE_BLINK_DELAY = BLINK_DURATION * 1.25
let blinkTimeoutId: NodeJS.Timeout

const isEyesReset = ref(false)
const hasMouseMovedSinceReset = ref(true)
const previousMouseX = ref(mouseX.value)
const previousMouseY = ref(mouseY.value)

// Eye movement smoothing
const targetLeftEyeX = ref(0)
const targetLeftEyeY = ref(0)
const targetRightEyeX = ref(0)
const targetRightEyeY = ref(0)
const currentLeftEyeX = ref(0)
const currentLeftEyeY = ref(0)
const currentRightEyeX = ref(0)
const currentRightEyeY = ref(0)

// Gleam movement smoothing
const targetLeftGleamX = ref(0)
const targetLeftGleamY = ref(0)
const targetRightGleamX = ref(0)
const targetRightGleamY = ref(0)
const currentLeftGleamX = ref(0)
const currentLeftGleamY = ref(0)
const currentRightGleamX = ref(0)
const currentRightGleamY = ref(0)

// Eye movement constants
const EYE_MOVEMENT_EASING = 0.25
const GLEAM_MOVEMENT_EASING = 0.2
const GLEAM_MOVEMENT_FACTOR = 0.85 // 85% of pupil movement
const EYE_MOVEMENT_REFERENCE_MULTIPLIER = 20
const DISTANCE_FACTOR_DIVISOR = 5
const MIN_DISTANCE_FACTOR = 0.5
const MAX_DISTANCE_FACTOR = 1
const MAGNITUDE_SCALE = 0.7
const MAX_MAGNITUDE = 1
const ENHANCED_MAGNITUDE_FACTOR = 0.5
const TIME_OSCILLATION_PERIOD = 3000
const TIME_OSCILLATION_SCALE = 0.05
const LEFT_GLEAM_OSCILLATION_Y_FACTOR = 0.5
const RIGHT_GLEAM_OSCILLATION_X_FACTOR = 0.8
const RIGHT_GLEAM_OSCILLATION_Y_FACTOR = 0.7

function animateBlink() {
  if (blinkTimeoutId)
    clearTimeout(blinkTimeoutId)

  isBlinking.value = true

  setTimeout(() => {
    isBlinking.value = false

    // Random chance for double blink
    if (Math.random() < DOUBLE_BLINK_CHANCE) {
      setTimeout(() => {
        isBlinking.value = true
        setTimeout(() => {
          isBlinking.value = false
        }, BLINK_DURATION)
      }, DOUBLE_BLINK_DELAY)
    }
  }, BLINK_DURATION)

  const nextInterval = useRandom(BLINK_MIN_INTERVAL, BLINK_MAX_INTERVAL)
  blinkTimeoutId = setTimeout(animateBlink, nextInterval)
}

function animateTongue() {
  if (tongueTimeoutId)
    clearTimeout(tongueTimeoutId)

  // Start retracting tongue
  tongueExtension.value = TONGUE_EXTENSION_VALUE

  // After animation duration, extend tongue back
  setTimeout(() => {
    tongueExtension.value = 0
  }, ANIMATION_DURATION)

  // Schedule next animation
  const nextInterval = useRandom(MIN_INTERVAL, MAX_INTERVAL)
  tongueTimeoutId = setTimeout(animateTongue, nextInterval)
}

// Calculate eye movement for a single eye based on its position
function calculateEyeMovement(
  mouseX: number,
  mouseY: number,
  eyeCenterX: number,
  eyeCenterY: number,
  svgX: number,
  svgY: number,
  scale: number,
) {
  // Calculate direction from eye center to mouse
  const deltaX = mouseX - (svgX + eyeCenterX * scale)
  const deltaY = mouseY - (svgY + eyeCenterY * scale)

  // Calculate distance (used for scaling the movement)
  const distance = Math.hypot(deltaX, deltaY)

  // Get the eye movement reference size (diameter of the eye socket)
  const eyeMovementReference = EYE_MOVEMENT_REFERENCE_MULTIPLIER * scale

  // Calculate distanceFactor - less movement for very close cursor
  const distanceFactor = useClamp(distance / (eyeMovementReference * DISTANCE_FACTOR_DIVISOR), MIN_DISTANCE_FACTOR, MAX_DISTANCE_FACTOR)

  // Normalize with appropriate scaling for this specific eye
  // Smaller divisor = more sensitive movement
  const relativeX = deltaX / eyeMovementReference
  const relativeY = deltaY / eyeMovementReference

  // Calculate magnitude of movement - taking direction into account
  const magnitude = useClamp(Math.hypot(relativeX, relativeY) * MAGNITUDE_SCALE, 0, MAX_MAGNITUDE)

  // Normalize direction vector
  let directionX = 0
  let directionY = 0
  if (distance > 0) {
    directionX = deltaX / distance
    directionY = deltaY / distance
  }

  // Scale movement by MAX_EYE_MOVEMENT and add enhancement for close distances
  const enhancedMagnitude = magnitude * (1 + (1 - distanceFactor) * ENHANCED_MAGNITUDE_FACTOR)
  const moveX = directionX * enhancedMagnitude * MAX_EYE_MOVEMENT
  const moveY = directionY * enhancedMagnitude * MAX_EYE_MOVEMENT

  return { directionX, directionY, distanceFactor, magnitude, moveX, moveY }
}

function resetEyes() {
  isEyesReset.value = true
  hasMouseMovedSinceReset.value = false
  previousMouseX.value = mouseX.value
  previousMouseY.value = mouseY.value

  // Reset target and current positions for pupils
  targetLeftEyeX.value = 0
  targetLeftEyeY.value = 0
  targetRightEyeX.value = 0
  targetRightEyeY.value = 0
  currentLeftEyeX.value = 0
  currentLeftEyeY.value = 0
  currentRightEyeX.value = 0
  currentRightEyeY.value = 0

  // Reset target and current positions for gleams
  targetLeftGleamX.value = 0
  targetLeftGleamY.value = 0
  targetRightGleamX.value = 0
  targetRightGleamY.value = 0
  currentLeftGleamX.value = 0
  currentLeftGleamY.value = 0
  currentRightGleamX.value = 0
  currentRightGleamY.value = 0

  if (leftEyeGroup.value && rightEyeGroup.value) {
    leftEyeGroup.value.style.transform = 'translate(0px, 0px)'
    rightEyeGroup.value.style.transform = 'translate(0px, 0px)'
  }

  if (leftGleam.value && rightGleam.value) {
    leftGleam.value.style.transform = 'translate(0px, 0px)'
    rightGleam.value.style.transform = 'translate(0px, 0px)'
  }
}

function updateEyes() {
  if (!container.value || !leftEyeGroup.value || !rightEyeGroup.value || !leftGleam.value || !rightGleam.value) {
    animationFrameId = requestAnimationFrame(updateEyes)

    return
  }

  // Check if mouse has moved since reset
  if (!hasMouseMovedSinceReset.value && (mouseX.value !== previousMouseX.value || mouseY.value !== previousMouseY.value)) {
    hasMouseMovedSinceReset.value = true
    isEyesReset.value = false
  }

  if (isEyesReset.value) {
    animationFrameId = requestAnimationFrame(updateEyes)

    return
  }

  // Calculate SVG position and scale
  const rect = container.value.getBoundingClientRect()
  const svgX = rect.left
  const svgY = rect.top
  const scale = rect.width / SVG_WIDTH // Scale factor (128 is SVG viewBox width)

  // Set eyes to center position initially
  if (mouseX.value === 0 && mouseY.value === 0) {
    targetLeftEyeX.value = 0
    targetLeftEyeY.value = 0
    targetRightEyeX.value = 0
    targetRightEyeY.value = 0
    targetLeftGleamX.value = 0
    targetLeftGleamY.value = 0
    targetRightGleamX.value = 0
    targetRightGleamY.value = 0
  }
  else {
    // Calculate individual eye movements based on their actual positions
    const leftEyeResult = calculateEyeMovement(
      mouseX.value,
      mouseY.value,
      LEFT_EYE_X,
      LEFT_EYE_Y,
      svgX,
      svgY,
      scale,
    )

    const rightEyeResult = calculateEyeMovement(
      mouseX.value,
      mouseY.value,
      RIGHT_EYE_X,
      RIGHT_EYE_Y,
      svgX,
      svgY,
      scale,
    )

    // Set target positions for pupils
    targetLeftEyeX.value = leftEyeResult.moveX
    targetLeftEyeY.value = leftEyeResult.moveY
    targetRightEyeX.value = rightEyeResult.moveX
    targetRightEyeY.value = rightEyeResult.moveY

    // Small time-based oscillation for subtle liveliness
    const timeOscillation = Math.sin(Date.now() / TIME_OSCILLATION_PERIOD) * TIME_OSCILLATION_SCALE

    // Left gleam follows left pupil at increased rate
    targetLeftGleamX.value = leftEyeResult.moveX * GLEAM_MOVEMENT_FACTOR - timeOscillation
    targetLeftGleamY.value = leftEyeResult.moveY * GLEAM_MOVEMENT_FACTOR - Math.abs(timeOscillation) * LEFT_GLEAM_OSCILLATION_Y_FACTOR

    // Right gleam follows right pupil also at increased rate with slightly different oscillation
    targetRightGleamX.value = rightEyeResult.moveX * GLEAM_MOVEMENT_FACTOR + timeOscillation * RIGHT_GLEAM_OSCILLATION_X_FACTOR
    targetRightGleamY.value = rightEyeResult.moveY * GLEAM_MOVEMENT_FACTOR - Math.abs(timeOscillation) * RIGHT_GLEAM_OSCILLATION_Y_FACTOR
  }

  // Apply smooth movement with easing for pupils
  currentLeftEyeX.value += (targetLeftEyeX.value - currentLeftEyeX.value) * EYE_MOVEMENT_EASING
  currentLeftEyeY.value += (targetLeftEyeY.value - currentLeftEyeY.value) * EYE_MOVEMENT_EASING
  currentRightEyeX.value += (targetRightEyeX.value - currentRightEyeX.value) * EYE_MOVEMENT_EASING
  currentRightEyeY.value += (targetRightEyeY.value - currentRightEyeY.value) * EYE_MOVEMENT_EASING

  // Apply smooth movement with different easing for gleams
  currentLeftGleamX.value += (targetLeftGleamX.value - currentLeftGleamX.value) * GLEAM_MOVEMENT_EASING
  currentLeftGleamY.value += (targetLeftGleamY.value - currentLeftGleamY.value) * GLEAM_MOVEMENT_EASING
  currentRightGleamX.value += (targetRightGleamX.value - currentRightGleamX.value) * GLEAM_MOVEMENT_EASING
  currentRightGleamY.value += (targetRightGleamY.value - currentRightGleamY.value) * GLEAM_MOVEMENT_EASING

  const leftX = useRound(currentLeftEyeX.value, 2)
  const leftY = useRound(currentLeftEyeY.value, 2)
  const rightX = useRound(currentRightEyeX.value, 2)
  const rightY = useRound(currentRightEyeY.value, 2)

  const leftGleamX = useRound(currentLeftGleamX.value, 2)
  const leftGleamY = useRound(currentLeftGleamY.value, 2)
  const rightGleamX = useRound(currentRightGleamX.value, 2)
  const rightGleamY = useRound(currentRightGleamY.value, 2)

  leftEyeGroup.value.style.transform = `translate(${leftX}px, ${leftY}px)`
  rightEyeGroup.value.style.transform = `translate(${rightX}px, ${rightY}px)`

  leftGleam.value.style.transform = `translate(${leftGleamX}px, ${leftGleamY}px)`
  rightGleam.value.style.transform = `translate(${rightGleamX}px, ${rightGleamY}px)`

  animationFrameId = requestAnimationFrame(updateEyes)
}

onMounted(() => {
  animationFrameId = requestAnimationFrame(updateEyes)
  tongueTimeoutId = setTimeout(animateTongue)
  blinkTimeoutId = setTimeout(animateBlink)
})

onUnmounted(() => {
  if (animationFrameId)
    cancelAnimationFrame(animationFrameId)
  if (tongueTimeoutId)
    clearTimeout(tongueTimeoutId)
  if (blinkTimeoutId)
    clearTimeout(blinkTimeoutId)
})
</script>

<template>
  <div
    ref="container"
    @click="() => {
      animateBlink()
      resetEyes()
      animateTongue()
    }"
  >
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`"
      class="drop-shadow-lg"
    >
      <defs>
        <linearGradient
          id="tongueGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            stop-color="#ffb5c9"
          />
          <stop
            offset="100%"
            stop-color="#ff8aa8"
          />
        </linearGradient>
        <radialGradient
          id="eyeGradient"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop
            offset="50%"
            stop-color="#ffffff"
          />
          <stop
            offset="100%"
            stop-color="#d8d8d8"
          />
        </radialGradient>
      </defs>

      <!-- Ears -->
      <circle
        :cx="LEFT_EAR_X"
        :cy="LEFT_EAR_Y"
        :r="EAR_OUTER_RADIUS"
        fill="white"
      />
      <circle
        :cx="LEFT_EAR_X"
        :cy="LEFT_EAR_Y"
        :r="EAR_INNER_RADIUS"
        fill="none"
        stroke="#d8d8d8"
        :stroke-width="EAR_STROKE_WIDTH"
      />
      <circle
        :cx="RIGHT_EAR_X"
        :cy="RIGHT_EAR_Y"
        :r="EAR_OUTER_RADIUS"
        fill="white"
      />
      <circle
        :cx="RIGHT_EAR_X"
        :cy="RIGHT_EAR_Y"
        :r="EAR_INNER_RADIUS"
        fill="none"
        stroke="#d8d8d8"
        :stroke-width="EAR_STROKE_WIDTH"
      />

      <!-- Head -->
      <circle
        :cx="HEAD_X"
        :cy="HEAD_Y"
        :r="HEAD_RADIUS"
        fill="white"
      />

      <!-- Eyes -->
      <g>
        <line
          v-if="isBlinking"
          :x1="LEFT_BLINK_X1"
          :y1="LEFT_BLINK_Y"
          :x2="LEFT_BLINK_X2"
          :y2="LEFT_BLINK_Y"
          stroke="#333"
          :stroke-width="BLINK_STROKE_WIDTH"
          stroke-linecap="round"
        />
        <template v-else>
          <ellipse
            :cx="LEFT_EYE_X"
            :cy="LEFT_EYE_Y"
            :rx="EYE_ELLIPSE_RX"
            :ry="EYE_ELLIPSE_RY"
            fill="url(#eyeGradient)"
          />
          <g ref="leftEyeGroup">
            <!-- Pupil -->
            <circle
              :cx="LEFT_EYE_X"
              :cy="LEFT_EYE_Y"
              :r="PUPIL_RADIUS"
              fill="#333"
            />
          </g>
          <!-- Gleam (independent from pupil) -->
          <circle
            ref="leftGleam"
            :cx="LEFT_GLEAM_X"
            :cy="LEFT_GLEAM_Y"
            :r="GLEAM_RADIUS"
            fill="white"
          />
        </template>
      </g>
      <g>
        <line
          v-if="isBlinking"
          :x1="RIGHT_BLINK_X1"
          :y1="RIGHT_BLINK_Y"
          :x2="RIGHT_BLINK_X2"
          :y2="RIGHT_BLINK_Y"
          stroke="#333"
          :stroke-width="BLINK_STROKE_WIDTH"
          stroke-linecap="round"
        />
        <template v-else>
          <ellipse
            :cx="RIGHT_EYE_X"
            :cy="RIGHT_EYE_Y"
            :rx="EYE_ELLIPSE_RX"
            :ry="EYE_ELLIPSE_RY"
            fill="url(#eyeGradient)"
          />
          <g ref="rightEyeGroup">
            <!-- Pupil -->
            <circle
              :cx="RIGHT_EYE_X"
              :cy="RIGHT_EYE_Y"
              :r="PUPIL_RADIUS"
              fill="#333"
            />
          </g>
          <!-- Gleam (independent from pupil) -->
          <circle
            ref="rightGleam"
            :cx="RIGHT_GLEAM_X"
            :cy="RIGHT_GLEAM_Y"
            :r="GLEAM_RADIUS"
            fill="white"
          />
        </template>
      </g>

      <!-- Nose -->
      <polygon
        :points="NOSE_POINTS"
        fill="#333"
        stroke="#333"
        :stroke-width="NOSE_STROKE_WIDTH"
        stroke-linejoin="round"
      />

      <!-- Tongue -->
      <path
        :d="`M ${TONGUE_LEFT_X} ${TONGUE_TOP_Y} L ${TONGUE_LEFT_X} ${TONGUE_BASE_Y - tongueExtension} C ${TONGUE_LEFT_X} ${TONGUE_CURVE_Y - tongueExtension} ${TONGUE_RIGHT_X} ${TONGUE_CURVE_Y - tongueExtension} ${TONGUE_RIGHT_X} ${TONGUE_BASE_Y - tongueExtension} L ${TONGUE_RIGHT_X} ${TONGUE_TOP_Y} L ${TONGUE_LEFT_X} ${TONGUE_TOP_Y}`"
        fill="url(#tongueGradient)"
        stroke="#ff8aa8"
        :stroke-width="TONGUE_STROKE_WIDTH"
        stroke-linejoin="round"
        stroke-linecap="round"
        :style="{ transition: `d ${ANIMATION_DURATION}ms ease-in-out` }"
      />
      <!-- Tongue groove -->
      <path
        :d="`M ${TONGUE_GROOVE_X} ${TONGUE_TOP_Y} L ${TONGUE_GROOVE_X} ${TONGUE_GROOVE_BASE_Y - tongueExtension}`"
        fill="none"
        stroke="#ff8aa8"
        :stroke-width="TONGUE_GROOVE_STROKE_WIDTH"
        stroke-linecap="round"
        :style="{ transition: `d ${ANIMATION_DURATION}ms ease-in-out` }"
      />

      <!-- Mouth (must come after tongue for correct layering) -->
      <line
        :x1="MOUTH_X1"
        :y1="MOUTH_Y"
        :x2="MOUTH_X2"
        :y2="MOUTH_Y"
        stroke="#333"
        :stroke-width="MOUTH_STROKE_WIDTH"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
