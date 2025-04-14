<script setup lang="ts">
import type { Dayjs } from 'dayjs'

const PAGE_TITLE = 'Training Bonus Activation Calculator'
const PAGE_DESCRIPTION = 'Calculate the exact start time required to complete training at reset on a specific date when using the Training Capacity Enhance City Bonus.'
const PAGE_ICON = 'fluent-emoji:military-helmet'

definePageMeta({
  description: `${PAGE_DESCRIPTION} in Whiteout Survival.`,
  icon: PAGE_ICON,
  title: `${PAGE_TITLE} for Whiteout Survival`,
})

const TRAINING_BONUS_DURATION_MULTIPLIER = 3

const dayjs = useDayjs()
const { localSettings } = useLocalSettings()
const { mobileScrollIntoView } = useMobileScrollIntoView()

const finishDateInput = shallowRef(dayjs().utc().add(3, 'days').startOf('day').toDate())

const trainingDurationSeconds = computed(() => {
  const [hours, minutes, seconds] = localSettings.trainingDuration.split(':').map(Number)
  const duration = dayjs.duration({
    hours,
    minutes,
    seconds,
  })

  return duration.asSeconds()
})

const isTrainingDurationValid = computed(() => {
  if (!localSettings.trainingDuration || !trainingDurationSeconds.value || trainingDurationSeconds.value < 1)
    return false

  // Validate duration format HH:mm:ss - hours can be any positive integer
  const durationRegex = /^\d+:[0-5]\d:[0-5]\d$/

  return durationRegex.test(localSettings.trainingDuration)
})
const isFinishDateValid = computed(() => dayjs(finishDateInput.value).isValid())

const durationSecondsWithBonus = computed(() => isTrainingDurationValid.value ? trainingDurationSeconds.value * TRAINING_BONUS_DURATION_MULTIPLIER : 0)

const durationWithBonusFormatted = computed(() => {
  const totalSeconds = durationSecondsWithBonus.value

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
 * The duration is tripled according to the game's training bonus mechanic.
 * The finish time is considered the start of the selected day (00:00:00 UTC).
 */
const requiredStartTime = computed<Dayjs | undefined>(() => {
  if (!isFinishDateValid.value || durationSecondsWithBonus.value < 1)
    return

  const selectedDate = dayjs(finishDateInput.value)
  const finishDateString = selectedDate.format(DATE_FORMAT)
  const finishDateTime = dayjs.utc(finishDateString)

  return finishDateTime.subtract(durationSecondsWithBonus.value, 'seconds')
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
    <div
      v-auto-animate
      class="space-y-12"
    >
      <div class="space-y-8">
        <div
          v-auto-animate
          class="flex flex-wrap items-center gap-4"
        >
          <label
            for="training-duration"
            class="text-lg sm:w-48"
          >Training duration:</label>
          <InputMask
            id="training-duration"
            v-model="localSettings.trainingDuration"
            mask="99:99:99"
            :slot-char="TIME_FORMATS.LONG_TIME"
            highlight-on-focus
            :invalid="!isTrainingDurationValid"
            class="w-32 tabular-nums"
            @focus="mobileScrollIntoView"
          />
          <ClientOnly>
            <Message v-if="isTrainingDurationValid">
              + <strong>Training Capacity Enhance</strong> City Bonus <span class="text-sm">(3&times;&nbsp;duration)</span> =&nbsp;<strong class="tabular-nums">{{ durationWithBonusFormatted }}</strong>
            </Message>
          </ClientOnly>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <label
            for="finish-date"
            class="text-lg sm:w-48"
          >Desired finish date:</label>
          <DatePicker
            v-model="finishDateInput"
            class="w-32"
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
          class="flex flex-wrap items-center gap-4"
        >
          <div class="flex items-center gap-2">
            <div class="text-lg font-bold sm:w-48">
              Start training at:
            </div>
          </div>
          <div class="flex items-center gap-2">
            <time
              class="text-xl font-medium tabular-nums"
              :class="hasStartTimePassed ? 'text-red-500' : 'text-primary'"
              :datetime="requiredStartTime.toISOString()"
            >{{ formattedStartTime }}</time>
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
