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

const isLoaded = computed(() => !error.value && secondsUntilReset.value > 0)
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out-back delay-500"
    enter-from-class="scale-90 opacity-0 will-change-transform"
    leave-active-class="transition ease-in"
    leave-to-class="scale-90 opacity-0 will-change-transform"
  >
    <div
      v-if="isLoaded"
      class="flex flex-col items-end gap-0.5"
    >
      <div>
        <Icon
          class="inline translate-y-[0.15em]"
          size="16"
          name="bxs:hourglass"
        />Reset in:
      </div>
      <div class="space-y-1">
        <time
          class="text-xl font-semibold tabular-nums"
          :datetime="timeRemainingUntilReset"
          aria-label="countdown timer"
        >
          {{ timeRemainingUntilReset }}
        </time>
        <ProgressBar
          :value="progress"
          :show-value="false"
          class="h-1.5"
          :pt="{
            value: {
              style: progressColor ? { backgroundColor: progressColor, transition: 'background-color 1s ease' } : undefined,
            },
          }"
        />
      </div>
    </div>
  </Transition>
</template>
