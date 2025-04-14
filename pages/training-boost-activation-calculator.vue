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

const TRAINING_BOOST_DURATION_MULTIPLIER = 3

const dayjs = useDayjs()
const { localSettings } = useLocalSettings()
const { mobileScrollIntoView } = useMobileScrollIntoView()

const trainingDurationInput = shallowRef('12:00:00')
const finishDateInput = shallowRef(dayjs().utc().add(3, 'days').startOf('day').toDate())

const trainingDurationSeconds = computed(() => {
  const [hours, minutes, seconds] = trainingDurationInput.value.split(':').map(Number)
  const duration = dayjs.duration({
    hours,
    minutes,
    seconds,
  })

  return duration.asSeconds()
})

const isTrainingDurationValid = computed(() => {
  if (!trainingDurationInput.value || !trainingDurationSeconds.value || trainingDurationSeconds.value < 1)
    return false

  // Validate duration format HH:mm:ss - hours can be any positive integer
  const durationRegex = /^\d+:[0-5]\d:[0-5]\d$/

  return durationRegex.test(trainingDurationInput.value)
})
const isFinishDateValid = computed(() => dayjs(finishDateInput.value).isValid())

const durationSecondsWithBoost = computed(() => isTrainingDurationValid.value ? trainingDurationSeconds.value * TRAINING_BOOST_DURATION_MULTIPLIER : 0)

const durationWithBoostFormatted = computed(() => {
  const totalSeconds = durationSecondsWithBoost.value

  if (totalSeconds === 0)
    return '0s'

  const duration = dayjs.duration(totalSeconds, 'seconds')

  const formatted = [
    { suffix: 'd', value: duration.days() },
    { suffix: 'h', value: duration.hours() },
    { suffix: 'm', value: duration.minutes() },
    { suffix: 's', value: duration.seconds() },
  ]
    .filter(({ value }) => value > 0)
    .map(({ suffix, value }) => `${value}${suffix}`)
    .join(' ')

  return formatted
})

/**
 * Calculates the required start time based on the selected duration and finish date.
 * The duration is tripled according to the game's boost mechanic.
 * The finish time is considered the start of the selected day (00:00:00 UTC).
 */
const requiredStartTime = computed<Dayjs | undefined>(() => {
  if (!isFinishDateValid.value || durationSecondsWithBoost.value < 1) {
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined
  }

  try {
    const selectedDate = dayjs(finishDateInput.value)
    const finishDateString = selectedDate.format(DATE_FORMAT)
    const finishDateTime = dayjs.utc(finishDateString) // This creates 00:00:00 UTC for the given date

    // Use the pre-calculated tripled duration
    return finishDateTime.subtract(durationSecondsWithBoost.value, 'second')
  }
  catch (error) {
    console.error('Error calculating start time:', error)

    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined
  }
})

const hasStartTimePassed = computed(() => {
  if (!requiredStartTime.value)
    return false

  return requiredStartTime.value.isBefore(dayjs())
})

const formattedStartTime = computed(() => {
  if (!requiredStartTime.value)
    return

  return localSettings.useUtcTime ? requiredStartTime.value.format(DATE_TIME_FORMAT) : requiredStartTime.value.local().format(DATE_TIME_FORMAT)
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
        <div class="flex flex-wrap items-center gap-4">
          <label
            for="training-duration"
            class="text-lg sm:w-48"
          >Training duration:</label>
          <InputMask
            id="training-duration"
            v-model="trainingDurationInput"
            mask="99:99:99"
            :slot-char="TIME_FORMATS.LONG_TIME"
            highlight-on-focus
            :invalid="!isTrainingDurationValid"
            class="tabular-nums"
            @focus="mobileScrollIntoView"
          />
          <ClientOnly>
            <Message v-if="isTrainingDurationValid">
              + <strong>Training Capacity Enhance</strong> City Bonus <span class="text-sm">(3&times;&nbsp;duration)</span> =&nbsp;<strong class="tabular-nums">{{ durationWithBoostFormatted }}</strong>
            </Message>
          </ClientOnly>
        </div>

        <div class="flex flex-wrap items-center gap-4 md:flex-nowrap">
          <label
            for="finish-date"
            class="text-lg sm:w-48"
          >Desired finish date:</label>
          <DatePicker
            v-model="finishDateInput"
            input-id="finish-date"
            :placeholder="DATE_FORMAT"
            :min-date="$dayjs().add(1, 'day').toDate()"
            highlight-on-focus
            date-format="yy-mm-dd"
            :invalid="!isFinishDateValid"
            input-class="tabular-nums"
            @focus="mobileScrollIntoView"
          />
          <div>@ 00:00 UTC</div>
        </div>
      </div>

      <ClientOnly>
        <div
          v-if="requiredStartTime"
          class="mt-8 flex flex-wrap items-center gap-4"
        >
          <div class="flex items-center gap-2">
            <div class="text-lg font-bold sm:w-48">
              Start training at:
            </div>
          </div>
          <div
            class="flex items-center gap-2 text-xl font-medium tabular-nums"
            :class="hasStartTimePassed ? 'text-red-500' : 'text-primary'"
          >
            <time :datetime="requiredStartTime.toISOString()">{{ formattedStartTime }}</time>
            <Tag
              :severity="hasStartTimePassed ? 'danger' : 'info'"
              :value="requiredStartTime.fromNow()"
              icon="pi pi-clock"
              rounded
            />
          </div>
          <TimezoneToggle />
        </div>
      </ClientOnly>
    </div>
  </MainContentCard>
</template>
