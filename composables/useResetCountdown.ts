interface CountdownReturn {
  /** Whether there was an error calculating the time */
  error: Readonly<Ref<boolean>>
  /** Current time remaining in HH:mm:ss format */
  timeRemaining: Readonly<Ref<string>>
}

/**
 * Composable that provides a countdown timer to midnight UTC
 * Updates every second and handles edge cases and errors
 *
 * @example
 * ```ts
 * const { timeRemaining, error } = useCountdown()
 * ```
 *
 * @returns {CountdownReturn} Object containing the time remaining and error state
 * @property {Readonly<Ref<string>>} timeRemaining - Time remaining until midnight in HH:mm:ss format
 * @property {Readonly<Ref<boolean>>} error - Whether there was an error calculating the time
 */
export default function useResetCountdown(): CountdownReturn {
  const dayjs = useDayjs()
  const now = useNow({ interval: 1000 })
  const timeRemaining = ref('00:00:00')
  const error = ref(false)

  const calculateTimeToMidnight = () => {
    try {
      const currentTime = dayjs(now.value).utc()
      const midnight = currentTime.endOf('day')
      const diff = midnight.diff(currentTime)

      if (diff < 0) {
        error.value = true

        return
      }

      const duration = dayjs.duration(diff)
      timeRemaining.value = duration.format('HH:mm:ss')
      error.value = false
    }
    catch (error_) {
      if (error_ instanceof Error)
        console.error('Error calculating time to midnight:', error_.message)
      error.value = true
    }
  }

  watch(now, calculateTimeToMidnight, { immediate: true })

  return {
    error: readonly(error),
    timeRemaining: readonly(timeRemaining),
  }
}
