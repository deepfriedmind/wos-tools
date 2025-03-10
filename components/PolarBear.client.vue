<script setup lang="ts">
const { size = 128 } = defineProps<{
  size?: number
}>()

interface BlinkConfig {
  doubleBlinkChance: number
  doubleBlinkDelay: number
  duration: number
  left: {
    x1: number
    x2: number
    y: number
  }
  maxInterval: number
  minInterval: number
  right: {
    x1: number
    x2: number
    y: number
  }
  strokeWidth: number
}

interface EarConfig {
  innerRadius: number
  left: SvgElementPosition
  outerRadius: number
  right: SvgElementPosition
  strokeWidth: number
}

interface EyeConfig {
  ellipseRx: number
  ellipseRy: number
  gleamRadius: number
  left: SvgElementPosition
  leftGleam: SvgElementPosition
  pupilRadius: number
  right: SvgElementPosition
  rightGleam: SvgElementPosition
}

interface EyeMovementConfig {
  distanceFactorDivisor: number
  easing: number
  enhancedMagnitudeFactor: number
  magnitudeScale: number
  max: number
  maxDistanceFactor: number
  maxMagnitude: number
  minDistanceFactor: number
  referenceMultiplier: number
}

interface EyeMovementResult {
  directionX: number
  directionY: number
  distanceFactor: number
  magnitude: number
  moveX: number
  moveY: number
}

interface EyePositions {
  current: {
    left: Position
    right: Position
  }
  target: {
    left: Position
    right: Position
  }
}

interface GleamMovementConfig {
  easing: number
  leftOscillationYFactor: number
  movementFactor: number
  rightOscillationXFactor: number
  rightOscillationYFactor: number
  timeOscillationPeriod: number
  timeOscillationScale: number
}

interface GleamPositions {
  current: {
    left: Position
    right: Position
  }
  target: {
    left: Position
    right: Position
  }
}

interface HeadConfig {
  center: SvgElementPosition
  radius: number
}

interface MouthConfig {
  strokeWidth: number
  x1: number
  x2: number
  y: number
}

interface NoseConfig {
  points: string
  strokeWidth: number
}

interface Position {
  x: number
  y: number
}

interface SvgElementPosition {
  x: number
  y: number
}

interface TongueConfig {
  animationDuration: number
  baseY: number
  curveY: number
  extensionValue: number
  grooveBaseY: number
  grooveStrokeWidth: number
  grooveX: number
  leftX: number
  maxInterval: number
  minInterval: number
  rightX: number
  strokeWidth: number
  topY: number
}

const SVG_DIMENSIONS = {
  height: 128,
  width: 128,
}

const EAR: EarConfig = {
  innerRadius: 12,
  left: { x: 30, y: 38 },
  outerRadius: 17,
  right: { x: 98, y: 38 },
  strokeWidth: 2,
}

const HEAD: HeadConfig = {
  center: { x: 64, y: 64 },
  radius: 50,
}

const EYE: EyeConfig = {
  ellipseRx: 10,
  ellipseRy: 11,
  gleamRadius: 1.2,
  left: { x: 50, y: 52 },
  leftGleam: { x: 51, y: 51 },
  pupilRadius: 6,
  right: { x: 78, y: 52 },
  rightGleam: { x: 79, y: 51 },
}

const BLINK: BlinkConfig = {
  doubleBlinkChance: 0.2,
  doubleBlinkDelay: 150, // BLINK.duration * 1.25
  duration: 120,
  left: {
    x1: 44,
    x2: 60,
    y: 52,
  },
  maxInterval: 12_000,
  minInterval: 6000,
  right: {
    x1: 68,
    x2: 84,
    y: 52,
  },
  strokeWidth: 2.5,
}

const NOSE: NoseConfig = {
  points: '62.5,71 65.5,71 64,73',
  strokeWidth: 14,
}

const MOUTH: MouthConfig = {
  strokeWidth: 2,
  x1: 50,
  x2: 78,
  y: 84,
}

const TONGUE: TongueConfig = {
  animationDuration: 500,
  baseY: 94,
  curveY: 100,
  extensionValue: 6,
  grooveBaseY: 96,
  grooveStrokeWidth: 1,
  grooveX: 64,
  leftX: 58,
  maxInterval: 12_000,
  minInterval: 6000,
  rightX: 70,
  strokeWidth: 1.5,
  topY: 84,
}

const EYE_MOVEMENT: EyeMovementConfig = {
  distanceFactorDivisor: 5,
  easing: 0.25,
  enhancedMagnitudeFactor: 0.5,
  magnitudeScale: 0.7,
  max: 4,
  maxDistanceFactor: 1,
  maxMagnitude: 1,
  minDistanceFactor: 0.5,
  referenceMultiplier: 20,
}

const GLEAM_MOVEMENT: GleamMovementConfig = {
  easing: 0.2,
  leftOscillationYFactor: 0.5,
  movementFactor: 0.85,
  rightOscillationXFactor: 0.8,
  rightOscillationYFactor: 0.7,
  timeOscillationPeriod: 3000,
  timeOscillationScale: 0.05,
}

const container = useTemplateRef('container')
const leftPupil = useTemplateRef('leftPupil')
const rightPupil = useTemplateRef('rightPupil')
const leftGleam = useTemplateRef('leftGleam')
const rightGleam = useTemplateRef('rightGleam')

// Mouse tracking
const { x: mouseX, y: mouseY } = useMouse()
const debouncedMousePosition = computed(() => ({ x: mouseX.value, y: mouseY.value }))
const previousMouseX = ref(mouseX.value)
const previousMouseY = ref(mouseY.value)
const isEyesReset = ref(false)
const hasMouseMovedSinceReset = ref(true)

// Animation state and timeouts
let tongueTimeoutId: NodeJS.Timeout | undefined
let blinkTimeoutId: NodeJS.Timeout | undefined

// Use RAF composable for animation loop
const { pause, resume } = useRafFn((callbackArguments: { timestamp: number }) => {
  updateEyes(callbackArguments.timestamp)
}, { immediate: false })

// Tongue animation state
const tongueExtension = ref(0)

// Blinking animation state
const isBlinking = ref(false)

// Eye and gleam movement state
const eyePositions = reactive<EyePositions>({
  current: {
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  },
  target: {
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  },
})

const gleamPositions = reactive<GleamPositions>({
  current: {
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  },
  target: {
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  },
})

const svgRect = ref<DOMRect>()
const svgPosition = computed(() => {
  if (!svgRect.value)
    return { scale: 1, x: 0, y: 0 }

  return {
    scale: svgRect.value.width / SVG_DIMENSIONS.width,
    x: svgRect.value.left,
    y: svgRect.value.top,
  }
})

// Add after other reactive state
const throttledGetBoundingClientRect = useThrottleFn(() => {
  if (container.value)
    svgRect.value = container.value.getBoundingClientRect()
}, 100)

/**
 * Initiates and manages a blinking animation sequence
 * Clears any existing timeout, sets the eyes to blink state, and schedules
 * the eyes to return to normal. Has a random chance to trigger a double blink.
 * After completion, schedules the next random blink animation.
 */
function animateBlink() {
  if (blinkTimeoutId)
    clearTimeout(blinkTimeoutId)

  isBlinking.value = true

  setTimeout(() => {
    isBlinking.value = false

    // Random chance for double blink
    if (Math.random() < BLINK.doubleBlinkChance) {
      setTimeout(() => {
        isBlinking.value = true
        setTimeout(() => {
          isBlinking.value = false
        }, BLINK.duration)
      }, BLINK.doubleBlinkDelay)
    }
  }, BLINK.duration)

  blinkTimeoutId = scheduleAnimation(animateBlink, BLINK.minInterval, BLINK.maxInterval)
}

/**
 * Animates the tongue sticking out and retracting
 * Clears any existing timeout, extends the tongue, schedules retraction,
 * and sets up the next random animation.
 */
function animateTongue() {
  if (tongueTimeoutId)
    clearTimeout(tongueTimeoutId)

  // Start extending tongue
  tongueExtension.value = TONGUE.extensionValue

  // After animation duration, retract tongue
  setTimeout(() => {
    tongueExtension.value = 0
  }, TONGUE.animationDuration)

  // Schedule next animation
  tongueTimeoutId = scheduleAnimation(animateTongue, TONGUE.minInterval, TONGUE.maxInterval)
}

/**
 * Calculates eye and gleam positions based on mouse movement
 * Determines the appropriate positions for the eyes and gleams based on
 * the current mouse position relative to the SVG
 *
 * @param {number} mouseX - Current mouse X position
 * @param {number} mouseY - Current mouse Y position
 * @param {number} svgX - SVG container's X position
 * @param {number} svgY - SVG container's Y position
 * @param {number} scale - Scale factor for the SVG
 */
function calculateEyeAndGleamPositions(
  mouseX: number,
  mouseY: number,
  svgX: number,
  svgY: number,
  scale: number,
): void {
  // Calculate individual eye movements based on their actual positions
  const leftEyeResult = calculateEyeMovement(
    mouseX,
    mouseY,
    EYE.left.x,
    EYE.left.y,
    svgX,
    svgY,
    scale,
  )

  const rightEyeResult = calculateEyeMovement(
    mouseX,
    mouseY,
    EYE.right.x,
    EYE.right.y,
    svgX,
    svgY,
    scale,
  )

  // Set target positions for pupils
  eyePositions.target.left.x = leftEyeResult.moveX
  eyePositions.target.left.y = leftEyeResult.moveY
  eyePositions.target.right.x = rightEyeResult.moveX
  eyePositions.target.right.y = rightEyeResult.moveY

  // Small time-based oscillation for subtle liveliness
  const timeOscillation = Math.sin(Date.now() / GLEAM_MOVEMENT.timeOscillationPeriod) * GLEAM_MOVEMENT.timeOscillationScale

  // Set gleam target positions with appropriate oscillations
  setGleamTargetPositions(leftEyeResult, rightEyeResult, timeOscillation)
}

/**
 * Calculates eye movement for a single eye based on its position
 * Determines how much an eye should move in response to the mouse position
 * considering distance, scaling factors, and magnitude constraints.
 *
 * @param {number} mouseX - Current mouse X position
 * @param {number} mouseY - Current mouse Y position
 * @param {number} eyeCenterX - X coordinate of the eye center
 * @param {number} eyeCenterY - Y coordinate of the eye center
 * @param {number} svgX - SVG container's X position
 * @param {number} svgY - SVG container's Y position
 * @param {number} scale - Scale factor for the SVG
 * @returns {EyeMovementResult} Object containing movement calculations and direction vectors
 */
function calculateEyeMovement(
  mouseX: number,
  mouseY: number,
  eyeCenterX: number,
  eyeCenterY: number,
  svgX: number,
  svgY: number,
  scale: number,
): EyeMovementResult {
  // Calculate direction from eye center to mouse
  const deltaX = mouseX - (svgX + eyeCenterX * scale)
  const deltaY = mouseY - (svgY + eyeCenterY * scale)

  // Calculate distance (used for scaling the movement)
  const distance = Math.hypot(deltaX, deltaY)

  // Get the eye movement reference size (diameter of the eye socket)
  const eyeMovementReference = EYE_MOVEMENT.referenceMultiplier * scale

  // Calculate distanceFactor - less movement for very close cursor
  const distanceFactor = useClamp(
    distance / (eyeMovementReference * EYE_MOVEMENT.distanceFactorDivisor),
    EYE_MOVEMENT.minDistanceFactor,
    EYE_MOVEMENT.maxDistanceFactor,
  )

  // Normalize with appropriate scaling for this specific eye
  const relativeX = deltaX / eyeMovementReference
  const relativeY = deltaY / eyeMovementReference

  // Calculate magnitude of movement - taking direction into account
  const magnitude = useClamp(
    Math.hypot(relativeX, relativeY) * EYE_MOVEMENT.magnitudeScale,
    0,
    EYE_MOVEMENT.maxMagnitude,
  )

  // Normalize direction vector
  let directionX = 0
  let directionY = 0
  if (distance > 0) {
    directionX = deltaX / distance
    directionY = deltaY / distance
  }

  // Scale movement by MAX_EYE_MOVEMENT and add enhancement for close distances
  const enhancedMagnitude = magnitude * (1 + (1 - distanceFactor) * EYE_MOVEMENT.enhancedMagnitudeFactor)
  const moveX = directionX * enhancedMagnitude * EYE_MOVEMENT.max
  const moveY = directionY * enhancedMagnitude * EYE_MOVEMENT.max

  return { directionX, directionY, distanceFactor, magnitude, moveX, moveY }
}

/**
 * Cleans up all animation resources
 * Cancels any pending animation frame and clears all active timeouts
 * to prevent memory leaks and ensure proper component cleanup.
 */
function cleanupAnimations() {
  pause() // Stop RAF loop
  if (tongueTimeoutId)
    clearTimeout(tongueTimeoutId)
  if (blinkTimeoutId)
    clearTimeout(blinkTimeoutId)
}

/**
 * Resets eye positions to center
 * Sets all eye and gleam positions to their default centered state,
 * updates tracking state variables, and applies the position changes to SVG elements.
 */
function resetEyes() {
  isEyesReset.value = true
  hasMouseMovedSinceReset.value = false
  previousMouseX.value = mouseX.value
  previousMouseY.value = mouseY.value

  // Reset target and current positions for pupils and gleams
  resetPosition({
    current: eyePositions.current.left,
    target: eyePositions.target.left,
  })
  resetPosition({
    current: eyePositions.current.right,
    target: eyePositions.target.right,
  })
  resetPosition({
    current: gleamPositions.current.left,
    target: gleamPositions.target.left,
  })
  resetPosition({
    current: gleamPositions.current.right,
    target: gleamPositions.target.right,
  })

  // Reset SVG element positions
  setSvgPosition(leftPupil.value, 0, 0)
  setSvgPosition(rightPupil.value, 0, 0)
  setSvgPosition(leftGleam.value, 0, 0)
  setSvgPosition(rightGleam.value, 0, 0)
}

/**
 * Resets a position object to its default values
 * Sets both target and current positions to zero.
 *
 * @param {object} position - Position object containing current and target positions
 * @param {Position} position.current - Current position coordinates
 * @param {Position} position.target - Target position coordinates
 */
function resetPosition(
  position: { current: Position, target: Position },
): void {
  position.target.x = 0
  position.target.y = 0
  position.current.x = 0
  position.current.y = 0
}

/**
 * Schedules an animation with a random interval
 * Generates a random timing between the specified min and max intervals,
 * and schedules the callback function to run after that timing.
 *
 * @param {Function} callback - Function to be called after the interval
 * @param {number} minInterval - Minimum interval in milliseconds
 * @param {number} maxInterval - Maximum interval in milliseconds
 * @returns {NodeJS.Timeout} Timeout identifier for the scheduled animation
 */
function scheduleAnimation(
  callback: () => void,
  minInterval: number,
  maxInterval: number,
): NodeJS.Timeout {
  const nextInterval = useRandom(minInterval, maxInterval)

  return setTimeout(callback, nextInterval)
}

/**
 * Sets gleam target positions based on eye movement results
 * Updates the gleam position targets with appropriate oscillation effects
 * to create natural-looking highlights in the eyes.
 *
 * @param {EyeMovementResult} leftEyeResult - Movement calculation results for left eye
 * @param {EyeMovementResult} rightEyeResult - Movement calculation results for right eye
 * @param {number} timeOscillation - Time-based oscillation value for organic movement
 */
function setGleamTargetPositions(
  leftEyeResult: EyeMovementResult,
  rightEyeResult: EyeMovementResult,
  timeOscillation: number,
): void {
  // Left gleam follows left pupil at increased rate
  gleamPositions.target.left.x = leftEyeResult.moveX * GLEAM_MOVEMENT.movementFactor - timeOscillation
  gleamPositions.target.left.y = leftEyeResult.moveY * GLEAM_MOVEMENT.movementFactor - Math.abs(timeOscillation) * GLEAM_MOVEMENT.leftOscillationYFactor

  // Right gleam follows right pupil also at increased rate with slightly different oscillation
  gleamPositions.target.right.x = rightEyeResult.moveX * GLEAM_MOVEMENT.movementFactor + timeOscillation * GLEAM_MOVEMENT.rightOscillationXFactor
  gleamPositions.target.right.y = rightEyeResult.moveY * GLEAM_MOVEMENT.movementFactor - Math.abs(timeOscillation) * GLEAM_MOVEMENT.rightOscillationYFactor
}

/**
 * Sets position for an SVG element using CSS transform
 * Applies x and y coordinates as a translate transform to the element if it exists.
 *
 * @param {SVGElement | null} element - SVG element to position
 * @param {number} x - X coordinate for translation
 * @param {number} y - Y coordinate for translation
 */
function setSvgPosition(
  element: null | SVGElement,
  x: number,
  y: number,
): void {
  if (element)
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`
}

/**
 * Sets up all animation systems
 * Initializes the animation frame loop and schedules the first
 * tongue and blink animations with random intervals.
 */
function setupAnimations() {
  resume() // Start RAF loop
  tongueTimeoutId = scheduleAnimation(animateTongue, TONGUE.minInterval, TONGUE.maxInterval)
  blinkTimeoutId = scheduleAnimation(animateBlink, BLINK.minInterval, BLINK.maxInterval)
}

/**
 * Main animation loop for eye movement
 * Handles mouse tracking, eye and gleam position calculations, and applies
 * smooth transitions with easing to all moving elements.
 */
function updateEyes(_time: number) {
  if (!container.value || !leftPupil.value || !rightPupil.value || !leftGleam.value || !rightGleam.value)
    return

  // Throttled rect update for responsive behavior
  throttledGetBoundingClientRect()

  // Check if mouse has moved since reset
  if (!hasMouseMovedSinceReset.value && (debouncedMousePosition.value.x !== previousMouseX.value || debouncedMousePosition.value.y !== previousMouseY.value)) {
    hasMouseMovedSinceReset.value = true
    isEyesReset.value = false
  }

  if (isEyesReset.value)
    return

  // Set eyes and gleams to target positions
  if (debouncedMousePosition.value.x === 0 && debouncedMousePosition.value.y === 0) {
    // Center position when mouse is at origin (initial state)
    resetPosition({ current: eyePositions.target.left, target: eyePositions.target.left })
    resetPosition({ current: eyePositions.target.right, target: eyePositions.target.right })
    resetPosition({ current: gleamPositions.target.left, target: gleamPositions.target.left })
    resetPosition({ current: gleamPositions.target.right, target: gleamPositions.target.right })
  }
  else {
    // Calculate positions based on mouse movement
    calculateEyeAndGleamPositions(debouncedMousePosition.value.x, debouncedMousePosition.value.y, svgPosition.value.x, svgPosition.value.y, svgPosition.value.scale)
  }

  // Apply smooth movement with easing for all positions
  updatePositionWithEasing(eyePositions.current.left, eyePositions.target.left, EYE_MOVEMENT.easing)
  updatePositionWithEasing(eyePositions.current.right, eyePositions.target.right, EYE_MOVEMENT.easing)
  updatePositionWithEasing(gleamPositions.current.left, gleamPositions.target.left, GLEAM_MOVEMENT.easing)
  updatePositionWithEasing(gleamPositions.current.right, gleamPositions.target.right, GLEAM_MOVEMENT.easing)

  // Round values for performance and apply transforms
  const leftX = useRound(eyePositions.current.left.x, 2)
  const leftY = useRound(eyePositions.current.left.y, 2)
  const rightX = useRound(eyePositions.current.right.x, 2)
  const rightY = useRound(eyePositions.current.right.y, 2)

  const leftGleamX = useRound(gleamPositions.current.left.x, 2)
  const leftGleamY = useRound(gleamPositions.current.left.y, 2)
  const rightGleamX = useRound(gleamPositions.current.right.x, 2)
  const rightGleamY = useRound(gleamPositions.current.right.y, 2)

  // Apply transforms to SVG elements
  setSvgPosition(leftPupil.value, leftX, leftY)
  setSvgPosition(rightPupil.value, rightX, rightY)
  setSvgPosition(leftGleam.value, leftGleamX, leftGleamY)
  setSvgPosition(rightGleam.value, rightGleamX, rightGleamY)
}

/**
 * Updates a position with easing effect
 * Smoothly interpolates current position towards target position
 * using the specified easing factor.
 *
 * @param {Position} current - Current position to update
 * @param {Position} target - Target position to move towards
 * @param {number} easing - Easing factor (0-1) where higher values mean faster movement
 */
function updatePositionWithEasing(
  current: Position,
  target: Position,
  easing: number,
): void {
  current.x += (target.x - current.x) * easing
  current.y += (target.y - current.y) * easing
}

onMounted(() => {
  setupAnimations()
})

onUnmounted(() => {
  cleanupAnimations()
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
      :viewBox="`0 0 ${SVG_DIMENSIONS.width} ${SVG_DIMENSIONS.height}`"
      class="drop-shadow-lg contain-strict content-auto"
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
        :cx="EAR.left.x"
        :cy="EAR.left.y"
        :r="EAR.outerRadius"
        fill="white"
      />
      <circle
        :cx="EAR.left.x"
        :cy="EAR.left.y"
        :r="EAR.innerRadius"
        fill="none"
        stroke="#d8d8d8"
        :stroke-width="EAR.strokeWidth"
      />
      <circle
        :cx="EAR.right.x"
        :cy="EAR.right.y"
        :r="EAR.outerRadius"
        fill="white"
      />
      <circle
        :cx="EAR.right.x"
        :cy="EAR.right.y"
        :r="EAR.innerRadius"
        fill="none"
        stroke="#d8d8d8"
        :stroke-width="EAR.strokeWidth"
      />

      <!-- Head -->
      <circle
        :cx="HEAD.center.x"
        :cy="HEAD.center.y"
        :r="HEAD.radius"
        fill="white"
      />

      <!-- Eyes -->
      <line
        v-if="isBlinking"
        :x1="BLINK.left.x1"
        :y1="BLINK.left.y"
        :x2="BLINK.left.x2"
        :y2="BLINK.left.y"
        stroke="#333"
        :stroke-width="BLINK.strokeWidth"
        stroke-linecap="round"
      />
      <template v-else>
        <ellipse
          :cx="EYE.left.x"
          :cy="EYE.left.y"
          :rx="EYE.ellipseRx"
          :ry="EYE.ellipseRy"
          fill="url(#eyeGradient)"
        />
        <!-- Pupil -->
        <circle
          ref="leftPupil"
          class="will-change-transform"
          :cx="EYE.left.x"
          :cy="EYE.left.y"
          :r="EYE.pupilRadius"
          fill="#333"
        />
        <!-- Gleam (independent from pupil) -->
        <circle
          ref="leftGleam"
          class="will-change-transform"
          :cx="EYE.leftGleam.x"
          :cy="EYE.leftGleam.y"
          :r="EYE.gleamRadius"
          fill="white"
        />
      </template>

      <line
        v-if="isBlinking"
        :x1="BLINK.right.x1"
        :y1="BLINK.right.y"
        :x2="BLINK.right.x2"
        :y2="BLINK.right.y"
        stroke="#333"
        :stroke-width="BLINK.strokeWidth"
        stroke-linecap="round"
      />
      <template v-else>
        <ellipse
          :cx="EYE.right.x"
          :cy="EYE.right.y"
          :rx="EYE.ellipseRx"
          :ry="EYE.ellipseRy"
          fill="url(#eyeGradient)"
        />
        <!-- Pupil -->
        <circle
          ref="rightPupil"
          class="will-change-transform"
          :cx="EYE.right.x"
          :cy="EYE.right.y"
          :r="EYE.pupilRadius"
          fill="#333"
        />
        <!-- Gleam (independent from pupil) -->
        <circle
          ref="rightGleam"
          class="will-change-transform"
          :cx="EYE.rightGleam.x"
          :cy="EYE.rightGleam.y"
          :r="EYE.gleamRadius"
          fill="white"
        />
      </template>

      <!-- Nose -->
      <polygon
        :points="NOSE.points"
        fill="#333"
        stroke="#333"
        :stroke-width="NOSE.strokeWidth"
        stroke-linejoin="round"
      />

      <!-- Tongue -->
      <path
        :d="`M ${TONGUE.leftX} ${TONGUE.topY} L ${TONGUE.leftX} ${TONGUE.baseY - tongueExtension} C ${TONGUE.leftX} ${TONGUE.curveY - tongueExtension} ${TONGUE.rightX} ${TONGUE.curveY - tongueExtension} ${TONGUE.rightX} ${TONGUE.baseY - tongueExtension} L ${TONGUE.rightX} ${TONGUE.topY} L ${TONGUE.leftX} ${TONGUE.topY}`"
        fill="url(#tongueGradient)"
        stroke="#ff8aa8"
        :stroke-width="TONGUE.strokeWidth"
        stroke-linejoin="round"
        stroke-linecap="round"
        :style="{ transition: `d ${TONGUE.animationDuration}ms ease-in-out` }"
      />
      <!-- Tongue groove -->
      <path
        :d="`M ${TONGUE.grooveX} ${TONGUE.topY} L ${TONGUE.grooveX} ${TONGUE.grooveBaseY - tongueExtension}`"
        fill="none"
        stroke="#ff8aa8"
        :stroke-width="TONGUE.grooveStrokeWidth"
        stroke-linecap="round"
        :style="{ transition: `d ${TONGUE.animationDuration}ms ease-in-out` }"
      />

      <!-- Mouth (must come after tongue for correct layering) -->
      <line
        :x1="MOUTH.x1"
        :y1="MOUTH.y"
        :x2="MOUTH.x2"
        :y2="MOUTH.y"
        stroke="#333"
        :stroke-width="MOUTH.strokeWidth"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
