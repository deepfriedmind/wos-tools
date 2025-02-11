<script setup lang="ts">
import { _orange, _red, _yellow } from '#tailwind-config/theme/colors'

const { error, secondsUntilReset, timeRemainingUntilReset } = useResetCountdown()

const SECONDS_IN_DAY = 86_400
const progress = computed(() => {
  if (error.value)
    return 0

  return (secondsUntilReset.value / SECONDS_IN_DAY) * 100
})

const progressColor = computed(() => {
  if (secondsUntilReset.value <= 30 * 60) // 30 minutes
    return _red[600]
  if (secondsUntilReset.value <= 60 * 60) // 1 hour
    return _orange[500]
  if (secondsUntilReset.value <= 2 * 60 * 60) // 2 hours
    return _yellow[500]

  return false
})
</script>

<template>
  <div>
    <span
      class="sr-only"
      role="status"
      :aria-live="error ? 'assertive' : 'polite'"
    >
      {{ error ? 'Error calculating countdown' : 'Time until midnight UTC' }}
    </span>
    <time
      class="tabular-nums"
      :class="error ? 'text-red-500 dark:text-red-400' : ''"
      :datetime="timeRemainingUntilReset"
      :aria-label="error ? 'Error' : 'countdown timer'"
    >
      {{ error ? 'Error' : timeRemainingUntilReset }}
    </time>
    <ProgressBar
      v-if="!error"
      :value="progress"
      :show-value="false"
      class="mt-1 h-1.5"
      :class="error ? 'opacity-50' : ''"
      :pt="{
        value: {
          style: progressColor ? { backgroundColor: progressColor, transition: 'background-color 1s ease' } : undefined,
        },
      }"
    />
  </div>
</template>
