interface LocalSettings {
  timezone: string
  timezoneShort: string
  use24HourFormat: boolean
  useUtcTime: boolean
}

/**
 * Gets the current timezone information from the browser
 * @returns The timezone name and short timezone name
 */
function getTimezoneInfo(): { timezone: string, timezoneShort: string } {
  try {
    return {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneShort: Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
        .formatToParts(new Date())
        .find(part => part.type === 'timeZoneName')
        ?.value ?? 'UTC',
    }
  }
  catch (error) {
    console.error('Failed to get timezone info:', error)

    return {
      timezone: 'UTC',
      timezoneShort: 'UTC',
    }
  }
}

export const useLocalSettings = defineStore('local-settings', () => {
  const localSettings = ref<LocalSettings>({
    ...getTimezoneInfo(),
    use24HourFormat: true,
    useUtcTime: false,
  })

  /**
   * Updates timezone information from the browser
   */
  function updateTimezoneInfo() {
    const timezoneInfo = getTimezoneInfo()
    localSettings.value.timezone = timezoneInfo.timezone
    localSettings.value.timezoneShort = timezoneInfo.timezoneShort
  }

  // Update timezone info when on client side
  if (import.meta.client) {
    onMounted(() => {
      updateTimezoneInfo()
    })
  }

  return {
    localSettings,
    updateTimezoneInfo,
  }
}, {
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocalSettings, import.meta.hot))
}
