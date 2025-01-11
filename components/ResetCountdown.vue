<script setup lang="ts">
const { error, timeRemaining } = useResetCountdown()
</script>

<template>
  <div class="text-center">
    <span
      class="sr-only"
      role="status"
      :aria-live="error ? 'assertive' : 'polite'"
    >
      {{ error ? 'Error calculating countdown' : 'Time until midnight UTC' }}
    </span>
    <time
      class="font-mono text-lg tabular-nums"
      :class="error ? 'text-red-500 dark:text-red-400' : ''"
      :datetime="timeRemaining"
      :aria-label="error ? 'Error' : 'countdown timer'"
    >
      {{ error ? 'Error' : timeRemaining }}
    </time>
  </div>
</template>
