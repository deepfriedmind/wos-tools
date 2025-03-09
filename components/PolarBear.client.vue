<script setup lang="ts">
const { size = 128 } = defineProps<{
  size?: number
}>()

const MAX_EYE_MOVEMENT = 3
const { x: mouseX, y: mouseY } = useMouse()
const container = ref<HTMLDivElement>()
const leftEyeGroup = ref<SVGGElement>()
const rightEyeGroup = ref<SVGGElement>()
let animationFrameId: number

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
const DOUBLE_BLINK_DELAY = BLINK_DURATION * 1.5
let blinkTimeoutId: NodeJS.Timeout

const isEyesReset = ref(false)
const hasMouseMovedSinceReset = ref(true)
const previousMouseX = ref(mouseX.value)
const previousMouseY = ref(mouseY.value)

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

function resetEyes() {
  isEyesReset.value = true
  hasMouseMovedSinceReset.value = false
  previousMouseX.value = mouseX.value
  previousMouseY.value = mouseY.value

  if (leftEyeGroup.value && rightEyeGroup.value) {
    for (const eye of [leftEyeGroup.value, rightEyeGroup.value]) {
      eye.style.transform = 'translate(0px, 0px)'
    }
  }
}

function updateEyes() {
  if (!container.value || !leftEyeGroup.value || !rightEyeGroup.value) {
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

  const rect = container.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // Set eyes to center position initially
  if (mouseX.value === 0 && mouseY.value === 0) {
    for (const eye of [leftEyeGroup.value, rightEyeGroup.value]) {
      eye.style.transform = 'translate(0px, 0px)'
    }
  }
  else {
    // Calculate angle between mouse and container center
    const angle = Math.atan2(mouseY.value - centerY, mouseX.value - centerX)

    // Calculate eye movement based on angle and limit to 1 decimal
    const moveX = Number((Math.cos(angle) * MAX_EYE_MOVEMENT).toFixed(1))
    const moveY = Number((Math.sin(angle) * MAX_EYE_MOVEMENT).toFixed(1))

    // Update eye positions
    for (const eye of [leftEyeGroup.value, rightEyeGroup.value]) {
      eye.style.transform = `translate(${moveX}px, ${moveY}px)`
    }
  }

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
            <circle
              cx="50"
              cy="52"
              r="6"
              fill="#333"
            />
            <circle
              cx="51"
              cy="51"
              r="1.2"
              fill="white"
            />
          </g>
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
            <circle
              cx="78"
              cy="52"
              r="6"
              fill="#333"
            />
            <circle
              cx="79"
              cy="51"
              r="1.2"
              fill="white"
            />
          </g>
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
