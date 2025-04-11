<script setup lang="ts">
import type { Dayjs } from 'dayjs'

const PAGE_TITLE = 'Training Boost Activation Calculator'
const PAGE_DESCRIPTION = 'Calculate the exact start time needed to finish training at a specific date when using the Training Capacity Enhance City Bonus'
const PAGE_ICON = 'fluent-emoji:military-helmet'

definePageMeta({
  description: `${PAGE_DESCRIPTION} in Whiteout Survival.`,
  icon: PAGE_ICON,
  title: `${PAGE_TITLE} for Whiteout Survival`,
})

const { mobileScrollIntoView } = useMobileScrollIntoView()
const dayjs = useDayjs()
const { localSettings } = useLocalSettings()

const trainingDurationInput = ref<Date | undefined>(new Date(0, 0, 0, 12, 0, 0)) // 12:00:00
const finishDateInput = ref<Date | undefined>(dayjs().utc().add(3, 'day').startOf('day').toDate())

const isTrainingDurationValid = computed(() => trainingDurationInput.value !== undefined && dayjs(trainingDurationInput.value).isValid())
const isFinishDateValid = computed(() => finishDateInput.value !== undefined && dayjs(finishDateInput.value).isValid())

/** Calculates the tripled training duration in seconds. */
const tripledDurationSeconds = computed<number | undefined>(() => {
  if (!isTrainingDurationValid.value)
    return

  try {
    const durationDate = trainingDurationInput.value!
    // Extract H/M/S using local time methods, then create a duration object
    const duration = dayjs.duration({
      hours: durationDate.getHours(),
      minutes: durationDate.getMinutes(),
      seconds: durationDate.getSeconds(),
    })
    const totalDurationSeconds = duration.asSeconds()

    return totalDurationSeconds * 3
  }
  catch (error) {
    console.error('Error calculating tripled duration:', error)

    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined
  }
})

/** Formats the tripled duration into HH:mm:ss. */
const tripledDurationFormatted = computed<string | undefined>(() => {
  if (tripledDurationSeconds.value === undefined) {
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined
  }

  // Manually format duration to handle > 24 hours
  const duration = dayjs.duration(tripledDurationSeconds.value, 'seconds')
  const totalHours = Math.floor(duration.asHours())
  const minutes = duration.minutes()
  const seconds = duration.seconds()

  // Pad with leading zeros
  const formattedHours = String(totalHours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
})

/**
 * Calculates the required start time in UTC based on the selected duration and finish date.
 * The duration is tripled according to the game's boost mechanic.
 * The finish time is considered the start of the selected day (00:00:00 UTC).
 */
const requiredStartTimeUTC = computed<Dayjs | undefined>(() => {
  // Depends on finish date and the calculated tripled duration
  if (!isFinishDateValid.value || !tripledDurationSeconds.value) {
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined // Explicit return for type safety &amp; ESLint rule
  }

  try {
    // Ensure non-null with checks above
    const selectedDate = dayjs(finishDateInput.value!) // Keep local date info

    // Construct the target finish time explicitly as the start of that day in UTC
    // by formatting the selected date and passing it to dayjs.utc()
    const finishDateString = selectedDate.format('YYYY-MM-DD')
    const finishDateTimeUTC = dayjs.utc(finishDateString) // This creates 00:00:00 UTC for the given date

    // Use the pre-calculated tripled duration
    return finishDateTimeUTC.subtract(tripledDurationSeconds.value, 'second')
  }
  catch (error) {
    console.error('Error calculating start time:', error)

    // Explicitly return undefined on error
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined // Explicit return for type safety &amp; ESLint rule
  }
})

/** Checks if the required start time has already passed. */
const hasStartTimePassed = computed<boolean>(() => {
  if (!requiredStartTimeUTC.value)
    return false

  return requiredStartTimeUTC.value.isBefore(dayjs())
})

/** Formats the start time based on local settings. */
const formattedStartTime = computed<string | undefined>(() => {
  if (!requiredStartTimeUTC.value)
    return

  const startTime = requiredStartTimeUTC.value

  if (localSettings.useUtcTime) {
    return `${startTime.utc().format('YYYY-MM-DD HH:mm:ss')}`
  }
  else {
    // Format date part + local time part
    const datePart = startTime.format('YYYY-MM-DD')
    // Corrected: Access localSettings directly
    const timePart = startTime.toDate().toLocaleTimeString(undefined, localSettings.use24HourFormat ?
      TIME_DISPLAY_OPTIONS.HOUR_24
      : TIME_DISPLAY_OPTIONS.HOUR_12)

    return `${datePart} ${timePart}`
  }
})
</script>

<template>
  <MainContentCard
    :icon="PAGE_ICON"
    :heading="PAGE_TITLE"
    :sub-heading="PAGE_DESCRIPTION"
  >
    <div class="space-y-12">
      <div class="space-y-8">
        <!-- Training Duration Input -->
        <div class="flex flex-wrap items-center gap-4 md:flex-nowrap">
          <label
            for="training-duration"
            class="text-lg md:w-64"
          >Training Duration:</label>
          <DatePicker
            v-model="trainingDurationInput"
            input-id="training-duration"
            time-only
            show-seconds
            hour-format="24"
            :placeholder="TIME_FORMATS.LONG_TIME"
            highlight-on-focus
            :invalid="trainingDurationInput !== undefined ? !isTrainingDurationValid : false"
            class="md:w-48"
            @focus="mobileScrollIntoView"
          />
        </div>
        <ClientOnly>
          <div
            v-if="tripledDurationFormatted"
            class="mt-2 pl-4 text-sm text-surface-500 md:pl-0 md:pt-2"
          >
            <span class="font-semibold">with Training Capacity Enhance City Bonus =</span> <span class="tabular-nums">{{ tripledDurationFormatted }}</span>
          </div>
        </ClientOnly>

        <!-- Finish Date Input -->
        <div class="flex flex-wrap items-center gap-4 md:flex-nowrap">
          <label
            for="finish-date"
            class="text-lg md:w-64"
          >Desired Finish Date:</label>
          <DatePicker
            v-model="finishDateInput"
            input-id="finish-date"
            placeholder="YYYY-MM-DD"
            highlight-on-focus
            date-format="yy-mm-dd"
            :invalid="finishDateInput !== undefined ? !isFinishDateValid : false"
            class="md:w-48"
            @focus="mobileScrollIntoView"
          />
        </div>
      </div>

      <ClientOnly>
        <div
          v-if="requiredStartTimeUTC"
          class="mt-8 space-y-2"
        >
          <div class="flex items-center gap-2">
            <div class="text-lg font-semibold">
              Required Start Time:
            </div>
            <ToggleSwitch
              v-model="localSettings.useUtcTime"
              v-tooltip="`Switch to ${localSettings.useUtcTime ? 'local time' : 'UTC'}`"
              input-id="use-utc-time-toggle"
              class="-mr-1 origin-left translate-y-0.5 scale-75"
              aria-label="Toggle between UTC and local time display"
            />
          </div>
          <div
            class="text-xl font-medium tabular-nums"
            :class="hasStartTimePassed ? 'text-red-500' : 'text-primary'"
          >
            {{ formattedStartTime }} {{ localSettings.useUtcTime ? 'UTC' : localSettings.timezoneShort }}
            <span class="text-sm text-surface-500">({{ requiredStartTimeUTC.fromNow() }})</span>
          </div>
        </div>
      </ClientOnly>
    </div>
  </MainContentCard>
</template>
