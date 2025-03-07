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
    return _red[500]
  if (secondsUntilReset.value <= 60 * 60) // 1 hour
    return _orange[500]
  if (secondsUntilReset.value <= 2 * 60 * 60) // 2 hours
    return _yellow[400]

  return false
})

const isLoaded = computed(() => !error.value && secondsUntilReset.value > 0)
</script>

<template>
  <div class="md:min-h-[rem(65)]">
    <div
      v-if="isLoaded"
      class="flex animate-zoomin items-end gap-1 leading-none animate-once text-shadow sm:gap-2.5 md:flex-col"
    >
      <div>
        <Icon
          class="inline translate-y-[0.15em] max-sm:hidden"
          size="16"
          name="bxs:hourglass"
        />Reset in:
      </div>
      <time
        class="font-semibold tabular-nums sm:text-lg/none md:text-xl/none"
        :datetime="timeRemainingUntilReset"
        aria-label="countdown timer"
        :style="progressColor ? { color: progressColor, transition: 'color 1s ease-out' } : undefined"
      >
        {{ timeRemainingUntilReset }}
      </time>
      <ProgressBar
        :value="progress"
        :show-value="false"
        class="h-1.5 w-full max-md:hidden"
        :pt="{
          value: {
            style: progressColor ? { backgroundColor: progressColor, transition: 'background-color 1s ease-out' } : undefined,
          },
        }"
      />
    </div>
  </div>
</template>
