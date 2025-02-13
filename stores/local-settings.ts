interface LocalSettings {
  timezone: string
  timezoneShort: string
  use24HourFormat: boolean
  useUtcTime: boolean
}

export const useLocalSettings = defineStore('local-settings', () => {
  const localSettings = ref<LocalSettings>({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneShort: Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
      .formatToParts(new Date())
      .find(part => part.type === 'timeZoneName')
      ?.value ?? '',
    use24HourFormat: true,
    useUtcTime: false,
  })

  return {
    localSettings,
  }
}, {
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocalSettings, import.meta.hot))
}
