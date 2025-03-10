<script setup lang="ts">
const { size = 128 } = defineProps<{
  size?: number
}>()

// Increase maximum eye movement range for more visible response
const MAX_EYE_MOVEMENT = 4
const { x: mouseX, y: mouseY } = useMouse()
const container = ref<HTMLDivElement>()
const leftEyeGroup = ref<SVGGElement>()
const rightEyeGroup = ref<SVGGElement>()
const leftGleam = ref<SVGCircleElement>()
const rightGleam = ref<SVGCircleElement>()
let animationFrameId: number

// Define eye center positions for more accurate tracking
const LEFT_EYE_X = 50
const LEFT_EYE_Y = 52
const RIGHT_EYE_X = 78
const RIGHT_EYE_Y = 52

// Tongue animation state
const tongueExtension = ref(0)
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

const EYE_MOVEMENT_EASING = 0.25
const GLEAM_MOVEMENT_EASING = 0.2
const GLEAM_MOVEMENT_FACTOR = 0.85 // 85% of pupil movement

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
  tongueExtension.value = 6

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
  const eyeMovementReference = 20 * scale

  // Calculate distanceFactor - less movement for very close cursor
  const distanceFactor = useClamp(distance / (eyeMovementReference * 5), 0.5, 1)

  // Normalize with appropriate scaling for this specific eye
  // Smaller divisor = more sensitive movement
  const relativeX = deltaX / eyeMovementReference
  const relativeY = deltaY / eyeMovementReference

  // Calculate magnitude of movement - taking direction into account
  const magnitude = Math.min(1, Math.hypot(relativeX, relativeY) * 0.7)

  // Normalize direction vector
  let directionX = 0
  let directionY = 0
  if (distance > 0) {
    directionX = deltaX / distance
    directionY = deltaY / distance
  }

  // Scale movement by MAX_EYE_MOVEMENT and add enhancement for close distances
  const enhancedMagnitude = magnitude * (1 + (1 - distanceFactor) * 0.5)
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
  const scale = rect.width / 128 // Scale factor (128 is SVG viewBox width)

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
    const timeOscillation = Math.sin(Date.now() / 3000) * 0.05

    // Left gleam follows left pupil at increased rate
    targetLeftGleamX.value = leftEyeResult.moveX * GLEAM_MOVEMENT_FACTOR - timeOscillation
    targetLeftGleamY.value = leftEyeResult.moveY * GLEAM_MOVEMENT_FACTOR - Math.abs(timeOscillation) * 0.5

    // Right gleam follows right pupil also at increased rate with slightly different oscillation
    targetRightGleamX.value = rightEyeResult.moveX * GLEAM_MOVEMENT_FACTOR + timeOscillation * 0.8
    targetRightGleamY.value = rightEyeResult.moveY * GLEAM_MOVEMENT_FACTOR - Math.abs(timeOscillation) * 0.7
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

  const leftX = Number(currentLeftEyeX.value.toFixed(2))
  const leftY = Number(currentLeftEyeY.value.toFixed(2))
  const rightX = Number(currentRightEyeX.value.toFixed(2))
  const rightY = Number(currentRightEyeY.value.toFixed(2))

  const leftGleamX = Number(currentLeftGleamX.value.toFixed(2))
  const leftGleamY = Number(currentLeftGleamY.value.toFixed(2))
  const rightGleamX = Number(currentRightGleamX.value.toFixed(2))
  const rightGleamY = Number(currentRightGleamY.value.toFixed(2))

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
      viewBox="0 0 128 128"
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
        cx="30"
        cy="38"
        r="17"
        fill="white"
      />
      <circle
        cx="30"
        cy="38"
        r="12"
        fill="none"
        stroke="#d8d8d8"
        stroke-width="2"
      />
      <circle
        cx="98"
        cy="38"
        r="17"
        fill="white"
      />
      <circle
        cx="98"
        cy="38"
        r="12"
        fill="none"
        stroke="#d8d8d8"
        stroke-width="2"
      />

      <!-- Head -->
      <circle
        cx="64"
        cy="64"
        r="50"
        fill="white"
      />

      <!-- Eyes -->
      <g>
        <line
          v-if="isBlinking"
          x1="44"
          y1="52"
          x2="60"
          y2="52"
          stroke="#333"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <template v-else>
          <ellipse
            cx="50"
            cy="52"
            rx="10"
            ry="11"
            fill="url(#eyeGradient)"
          />
          <g ref="leftEyeGroup">
            <!-- Pupil -->
            <circle
              cx="50"
              cy="52"
              r="6"
              fill="#333"
            />
          </g>
          <!-- Gleam (independent from pupil) -->
          <circle
            ref="leftGleam"
            cx="51"
            cy="51"
            r="1.2"
            fill="white"
          />
        </template>
      </g>
      <g>
        <line
          v-if="isBlinking"
          x1="68"
          y1="52"
          x2="84"
          y2="52"
          stroke="#333"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <template v-else>
          <ellipse
            cx="78"
            cy="52"
            rx="10"
            ry="11"
            fill="url(#eyeGradient)"
          />
          <g ref="rightEyeGroup">
            <!-- Pupil -->
            <circle
              cx="78"
              cy="52"
              r="6"
              fill="#333"
            />
          </g>
          <!-- Gleam (independent from pupil) -->
          <circle
            ref="rightGleam"
            cx="79"
            cy="51"
            r="1.2"
            fill="white"
          />
        </template>
      </g>

      <!-- Nose -->
      <polygon
        points="62.5,71 65.5,71 64,73"
        fill="#333"
        stroke="#333"
        stroke-width="14"
        stroke-linejoin="round"
      />

      <!-- Tongue -->
      <path
        :d="`M 58 84 L 58 ${94 - tongueExtension} C 58 ${100 - tongueExtension} 70 ${100 - tongueExtension} 70 ${94 - tongueExtension} L 70 84 L 58 84`"
        fill="url(#tongueGradient)"
        stroke="#ff8aa8"
        stroke-width="1.5"
        stroke-linejoin="round"
        stroke-linecap="round"
        :style="{ transition: `d ${ANIMATION_DURATION}ms ease-in-out` }"
      />
      <!-- Tongue groove -->
      <path
        :d="`M 64 84 L 64 ${96 - tongueExtension}`"
        fill="none"
        stroke="#ff8aa8"
        stroke-width="1"
        stroke-linecap="round"
        :style="{ transition: `d ${ANIMATION_DURATION}ms ease-in-out` }"
      />

      <!-- Mouth (must come after tongue for correct layering) -->
      <line
        x1="50"
        y1="84"
        x2="78"
        y2="84"
        stroke="#333"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
