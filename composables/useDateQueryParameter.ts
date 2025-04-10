import type { Dayjs } from 'dayjs'

/**
 * Manages the server start date state, synchronizing it with URL query
 * parameters (`?date=YYYY-MM-DD`) and local settings (`localSettings.serverStartDate`).
 *
 * It initializes the date based on the URL query first, then local settings,
 * defaulting to the current date if neither is available or valid.
 * It updates the URL query parameter when the selected date changes, removing
 * the parameter if the selected date is today. It also persists the selected
 * date to `localSettings.serverStartDate`.
 *
 * @returns {{
 *   isToday: ComputedRef<boolean>,
 *   selectedDate: WritableComputedRef<Date>,
 *   selectedDateIsValid: ComputedRef<boolean>,
 *   selectedDayjs: Ref<Dayjs>
 * }} An object containing reactive refs and computed properties for the date state.
 * @property {ComputedRef<boolean>} isToday - True if the selected date is the current date.
 * @property {WritableComputedRef<Date>} selectedDate - The selected date as a standard JavaScript Date object. Writable for use with v-model (e.g., on a DatePicker).
 * @property {ComputedRef<boolean>} selectedDateIsValid - True if the selected date is a valid date.
 * @property {Ref<Dayjs>} selectedDayjs - The selected date as a Dayjs object. Useful for date manipulations and comparisons.
 */
export function useDateQueryParameter() {
  const route = useRoute()
  const router = useRouter()
  const dayjs = useDayjs()
  const { localSettings } = useLocalSettings()

  const parseDate = (dateString: unknown): Dayjs | undefined => {
    if (typeof dateString === 'string' && dayjs(dateString).isValid())
      return dayjs(dateString)

    return undefined
  }

  // Determine the initial date based on URL query or local settings
  const getInitialDate = (): Dayjs => {
    const dateFromQuery = parseDate(route.query.date)

    if (dateFromQuery)
      return dateFromQuery

    const dateFromSettings = parseDate(localSettings.serverStartDate)

    if (dateFromSettings)
      return dateFromSettings

    return dayjs() // Default to today
  }

  const selectedDayjs = ref<Dayjs>(getInitialDate())

  // Expose date as a Date object for components like DatePicker
  const selectedDate = computed<Date>({
    get: () => selectedDayjs.value.toDate(),
    set: (newDate: Date | number | string) => {
      // Ensure we always work with a Dayjs object
      const newDayjs = dayjs(newDate)

      if (newDayjs.isValid() && !newDayjs.isSame(selectedDayjs.value, 'day'))
        selectedDayjs.value = newDayjs
    },
  })

  const selectedDateIsValid = computed(() => selectedDayjs.value.isValid())
  const isToday = computed(() => selectedDayjs.value.isSame(dayjs(), 'day'))

  // Watch for changes in selectedDayjs to update local settings and URL
  watch(selectedDayjs, (newDayjs, oldDayjs) => {
    if (!newDayjs.isValid() || newDayjs.isSame(oldDayjs, 'day'))
      return

    const newDateString = newDayjs.format('YYYY-MM-DD')

    // 1. Update local settings
    localSettings.serverStartDate = newDateString

    // 2. Update URL query parameter
    const currentQuery = { ...route.query }
    const isNewDateToday = newDayjs.isSame(dayjs(), 'day')

    if (isNewDateToday) {
      // If the new date is today, remove the 'date' query parameter
      if (typeof currentQuery.date === 'string') {
        delete currentQuery.date
        void router.replace({
          hash: route.hash, // Preserve hash
          path: route.path,
          query: Object.keys(currentQuery).length > 0 ? currentQuery : undefined,
        })
      }
    }
    // If the new date is not today, add/update the 'date' query parameter
    else if (currentQuery.date !== newDateString) {
      void router.replace({
        hash: route.hash, // Preserve hash
        path: route.path,
        query: {
          ...currentQuery,
          date: newDateString,
        },
      })
    }
  }, { immediate: false }) // Don't run immediately, let initial state be set first

  // Handle initial URL state consistency on mount
  onMounted(() => {
    const dateFromSettings = parseDate(localSettings.serverStartDate)
    const dateFromQuery = parseDate(route.query.date)

    // Scenario 1: No valid date in settings, set to today
    if (!dateFromSettings) {
      localSettings.serverStartDate = dayjs().format('YYYY-MM-DD')

      // selectedDayjs is already defaulted to today, no state change needed
      // URL should not have 'date' param for today, ensure it's removed if present
      if (typeof route.query.date === 'string') {
        const query = { ...route.query }
        delete query.date
        void router.replace({ hash: route.hash, path: route.path, query: Object.keys(query).length > 0 ? query : undefined })
      }

      return
    }

    // Scenario 2: Date in settings, but not today and not in URL query -> Update URL
    if (dateFromSettings !== undefined && dateFromQuery === undefined
      && !dateFromSettings.isSame(dayjs(), 'day')) {
      void router.replace({
        hash: route.hash,
        path: route.path,
        query: { ...route.query, date: dateFromSettings.format('YYYY-MM-DD') },
      })
      // Ensure selectedDayjs reflects settings if query wasn't initially present
      if (!selectedDayjs.value.isSame(dateFromSettings, 'day'))
        selectedDayjs.value = dateFromSettings

      return
    }

    // Scenario 3: Date in query is present -> Ensure settings match if necessary
    if (dateFromQuery !== undefined) {
      // Update settings if no settings exist OR if query date differs from settings date
      let updateSettings = false
      if (dateFromSettings === undefined) {
        updateSettings = true
      }
      else if (!dateFromQuery.isSame(dateFromSettings, 'day')) {
        updateSettings = true
      }

      if (updateSettings) {
        localSettings.serverStartDate = dateFromQuery.format('YYYY-MM-DD')
      }
    }
  })

  return {
    isToday,
    selectedDate, // For v-model with DatePicker
    selectedDateIsValid,
    selectedDayjs, // For internal logic needing Dayjs object
  }
}
