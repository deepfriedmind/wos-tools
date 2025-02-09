interface CountdownReturn {
  /** Whether there was an error calculating the time */
  error: Readonly<Ref<boolean>>
  /** Number of seconds until daily reset (UTC midnight) */
  secondsUntilReset: Readonly<Ref<number>>
  /** Time until daily reset in HH:mm:ss format */
  timeRemainingUntilReset: Readonly<Ref<string>>
}

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
  const now = useNow({ interval: 1000 })
  const timeRemainingUntilReset = ref('00:00:00')
  const secondsUntilReset = ref(0)
  const hasError = ref(false)

  const calculateTimeUntilReset = () => {
    try {
      const currentTime = dayjs(now.value).utc()
      const resetTime = currentTime.endOf('day')
      const diff = resetTime.diff(currentTime)

      if (diff < 0) {
        hasError.value = true

        return
      }

      const duration = dayjs.duration(diff)
      timeRemainingUntilReset.value = duration.format('HH:mm:ss')
      secondsUntilReset.value = Math.floor(duration.asSeconds())
      hasError.value = false
    }
    catch (error) {
      if (error instanceof Error)
        console.error('Error calculating time until reset:', error.message)
      hasError.value = true
    }
  }

  watch(now, calculateTimeUntilReset, { immediate: true })

  return {
    error: readonly(hasError),
    secondsUntilReset: readonly(secondsUntilReset),
    timeRemainingUntilReset: readonly(timeRemainingUntilReset),
  }
}
