interface CountdownReturn {
  error: Readonly<Ref<boolean>>
  secondsUntilReset: Readonly<Ref<number>>
  timeRemainingUntilReset: Readonly<Ref<string>>
}

const DEBUG = false
const DEBUG_TIME = { hours: 2, minutes: 0, seconds: 3 } as const

/**
 * Composable that provides a countdown timer to daily reset (UTC midnight).
 * Updates automatically every second and handles edge cases and errors.
 * Uses Day.js for time calculations and formatting.
 *
 * @example
 * ```ts
 * const { timeRemainingUntilReset, secondsUntilReset, error } = useResetCountdown()
 *
 * // Display formatted time
 * console.log(timeRemainingUntilReset.value) // "23:45:30"
 *
 * // Use raw seconds
 * console.log(secondsUntilReset.value) // 85530
 *
 * // Check for errors
 * if (error.value) {
 *   console.error('Failed to calculate countdown')
 * }
 * ```
 *
 * @returns {CountdownReturn} Object containing countdown information
 * @property {Readonly<Ref<boolean>>} error - Whether there was an error calculating the time
 * @property {Readonly<Ref<number>>} secondsUntilReset - Number of seconds remaining until UTC midnight
 * @property {Readonly<Ref<string>>} timeRemainingUntilReset - Formatted time remaining (HH:mm:ss)
 */
export default function useResetCountdown(): CountdownReturn {
  const dayjs = useDayjs()
  const secondsUntilReset = ref(DEBUG ? dayjs.duration(DEBUG_TIME).asSeconds() : 0)
  const hasError = ref(false)
  const timeRemainingUntilReset = computed(() => dayjs.duration(secondsUntilReset.value, 'seconds').format(TIME_FORMATS.LONG_TIME))

  if (DEBUG) {
    // Debug mode - simple countdown from specified time
    const secondsUntilResetOriginal = secondsUntilReset.value
    useIntervalFn(() => {
      if (secondsUntilReset.value > 0) {
        secondsUntilReset.value--
      }
      else {
        secondsUntilReset.value = secondsUntilResetOriginal
      }
    }, 1000, { immediate: true })
  }
  else {
    // Normal mode - countdown to UTC midnight
    const updateTime = () => {
      try {
        const currentTime = dayjs().utc()
        const resetTime = currentTime.endOf('day')
        const diff = resetTime.diff(currentTime)

        if (diff < 0) {
          hasError.value = true

          return
        }

        secondsUntilReset.value = Math.floor(dayjs.duration(diff).asSeconds())
        hasError.value = false
      }
      catch (error) {
        if (error instanceof Error)
          console.error('Error calculating time until reset:', error.message)
        hasError.value = true
      }
    }

    useIntervalFn(updateTime, 1000, { immediate: true })
  }

  return {
    error: readonly(hasError),
    secondsUntilReset: readonly(secondsUntilReset),
    timeRemainingUntilReset: readonly(timeRemainingUntilReset),
  }
}
