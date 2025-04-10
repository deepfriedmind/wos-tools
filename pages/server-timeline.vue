<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

import { _lg, _sm, _xl } from '#tailwind-config/theme/screens'
import milestones from '~/public/data/server-timeline.json'

const PAGE_TITLE = 'Server Timeline'
const PAGE_DESCRIPTION = 'Information about the milestones a server/state goes through and when they unlock (approximately)'
const PAGE_ICON = 'mdi:chart-timeline-variant-shimmer'
const SERVER_TIMELINE_IMAGE_LABEL = 'Server timeline illustration from the Whiteout Survival Discord server'

definePageMeta({
  description: `${PAGE_DESCRIPTION} for Whiteout Survival.`,
  icon: PAGE_ICON,
  title: `${PAGE_TITLE} for Whiteout Survival`,
})

const route = useRoute()
const dayjs = useDayjs()

const { localSettings } = useLocalSettings()
const { setIsStickyHeaderEnabled } = useStickyHeader()
const isMinSmBreakpoint = useMediaQuery(`(min-width: ${_sm})`, { ssrWidth: 640 })
const isMinLgBreakpoint = useMediaQuery(`(min-width: ${_lg})`, { ssrWidth: 1024 })
const isMinXlBreakpoint = useMediaQuery(`(min-width: ${_xl})`, { ssrWidth: 1280 })

const {
  isToday,
  selectedDate,
  selectedDateIsValid,
  selectedDayjs,
} = useDateQueryParameter()

const timelineEntryRefs = ref<ReturnType<typeof unrefElement>[]>([])
const firstTimelineEntryRef = ref<ReturnType<typeof unrefElement>>()
const { bottom: firstMilestoneBottom } = useElementBounding(firstTimelineEntryRef)

function setTimelineEntryRef(index: number, element: ComponentPublicInstance) {
  if (
    !element
    || typeof element !== 'object'
    || isEmpty(element as unknown as Record<string, unknown>)
  ) {
    return
  }

  const resolvedElement = unrefElement(element)

  if (!resolvedElement)
    return

  timelineEntryRefs.value[index] = resolvedElement

  if (index === 0) {
    firstTimelineEntryRef.value = resolvedElement
  }
}

const isPanelsExpanded = shallowRef(true)
const panelsToggledByUser = shallowRef(false)
watch(selectedDayjs, () => {
  panelsToggledByUser.value = false
})

function toggleAllPanels() {
  panelsToggledByUser.value = true
  isPanelsExpanded.value = !isPanelsExpanded.value
}

const serverAgeString = computed(() => {
  const diff = dayjs().diff(selectedDayjs.value, 'day')

  return `${diff} ${diff === 1 ? 'day' : 'days'} ago`
})

const processedMilestones = computed(() => {
  if (!milestones || !localSettings.serverStartDate)
    return []

  const startDate = dayjs(localSettings.serverStartDate)
  const currentDate = dayjs()

  return milestones.map((milestone, index) => {
    const milestoneDate = startDate.add(milestone.day, 'day')

    return {
      ...milestone,
      hasMileStonePassed: milestoneDate.isBefore(currentDate.subtract(7, 'day'), 'day'),
      index,
      mileStoneDate: milestoneDate.format('YYYY-MM-DD'),
    }
  })
})

watch(processedMilestones, () => {
  timelineEntryRefs.value = []
})

const activeMilestoneId = shallowRef<string | undefined>()
const setActiveMilestone = useDebounceFn((newActiveId: string) => {
  const hasScrolledToTop = import.meta.client && firstMilestoneBottom.value > 100

  if (hasScrolledToTop)
    return activeMilestoneId.value = useKebabCase(processedMilestones.value[0].title)

  if (activeMilestoneId.value !== newActiveId)
    activeMilestoneId.value = newActiveId
}, 100)

const setUrlHash = useDebounceFn((newActiveId: string) => {
  const isFirstMilestone = processedMilestones.value.length > 0 && newActiveId === useKebabCase(processedMilestones.value[0].title)
  const hasScrolledToTop = import.meta.client && firstMilestoneBottom.value > 100

  if ((isFirstMilestone || hasScrolledToTop))
    return history.replaceState(undefined, '', `${route.path}${isEmpty(route.query) ? '' : `?${new URLSearchParams(route.query as Record<string, string>).toString()}`}`)

  if (location.hash !== `#${newActiveId}`)
    history.replaceState(undefined, '', `#${newActiveId}`)
}, 500)

// Observe timeline entries to update the active milestone for the TOC and set URL hash
useIntersectionObserver(
  timelineEntryRefs,
  (entries) => {
    const intersectingEntries = entries.filter(entry => entry.isIntersecting)

    if (intersectingEntries.length > 0) {
      // Target offset from the top of the viewport
      const TARGET_OFFSET_TOP = 100

      // Find the entry whose top edge is closest to the TARGET_OFFSET_TOP
      const closestEntry = useMinBy(intersectingEntries, entry => Math.abs(entry.boundingClientRect.top - TARGET_OFFSET_TOP))

      if (closestEntry?.target.id) {
        const newActiveId = closestEntry.target.id
        setActiveMilestone(newActiveId)
        setUrlHash(newActiveId)
      }
    }
  },
  {
    rootMargin: '-150px 0px -100% 0px',
    threshold: 0,
  },
)

const nextUpcomingMilestoneIndex = computed(() => {
  if (processedMilestones.value.length === 0)
    return -1
  const currentDate = dayjs().startOf('day')

  return processedMilestones.value.findIndex(milestone =>
    dayjs(milestone.mileStoneDate).startOf('day').isSameOrAfter(currentDate),
  )
})

function scrollToNextMilestone() {
  if (nextUpcomingMilestoneIndex.value !== -1) {
    const element = timelineEntryRefs.value[nextUpcomingMilestoneIndex.value]

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const showServerAgeHelpDialog = shallowRef(false)
const showTimelineImageDialog = shallowRef(false)
const sfcPresidentDate = shallowRef<Date | undefined>()
const loginDays = shallowRef(0)

const startDateFromSfcPresidentDate = computed(() => {
  if (!sfcPresidentDate.value)
    return

  return dayjs(sfcPresidentDate.value).utc().startOf('day').subtract(55, 'days').toDate()
})

const startDateFromLoginDays = computed(() => {
  if (loginDays.value === undefined || loginDays.value < 1)
    return

  return dayjs().utc().startOf('day').subtract(loginDays.value, 'days').toDate()
})

function getMilestoneIcon(type: string | undefined) {
  if (type === 'heroes') {
    return 'fluent-emoji:crossed-swords'
  }
  else if (type === 'pets') {
    return 'fluent-emoji:wolf'
  }
  else {
    return 'fluent-emoji:snowflake'
  }
}

onMounted(() => {
  setIsStickyHeaderEnabled(false)
})

onUnmounted(() => {
  setIsStickyHeaderEnabled(true)
})
</script>

<template>
  <MainContentCard
    :icon="PAGE_ICON"
    :heading="PAGE_TITLE"
    :sub-heading="PAGE_DESCRIPTION"
  >
    <CopyButton
      v-if="selectedDateIsValid && !isToday"
      v-tooltip="'Copy link for selected server age'"
      copy-string="currentUrl"
      variant="text"
      rounded
      class="!absolute right-0 top-0 size-12 animate-zoomin animate-once md:right-[rem(18)] md:top-[rem(18)]"
    >
      <Icon
        name="fluent:copy-link-24-regular"
        size="24"
        aria-label="Copy link to current settings"
      />
    </CopyButton>
    <ClientOnly>
      <div class="sticky -top-20 z-20 mb-12 rounded-xl bg-surface-900 p-4 shadow-xl lg:-top-3">
        <div class="flex flex-wrap justify-between gap-4">
          <div class="flex items-center gap-4">
            <IftaLabel>
              <DatePicker
                v-model="selectedDate"
                :size="isMinSmBreakpoint ? undefined : 'small'"
                show-icon
                input-id="date"
                class="w-full max-w-md"
                date-format="yy-mm-dd"
                :min-date="$dayjs(WOS_LAUNCH_DATE).toDate()"
                :max-date="new Date()"
                show-button-bar
                :invalid="!selectedDateIsValid"
              />
              <label for="date">Your server start date:</label>
            </IftaLabel>
            <div
              v-if="selectedDateIsValid && !isToday"
              class="shrink-0 text-sm sm:text-lg"
            >
              {{ serverAgeString }}
            </div>
            <div v-else>
              <Button
                v-tooltip="'How do I find my server start date?'"
                aria-label="How do I find my server start date?'"
                icon="pi pi-question-circle"
                rounded
                variant="text"
                size="large"
                @click="showServerAgeHelpDialog = true"
              />
              <Dialog
                v-model:visible="showServerAgeHelpDialog"
                header="How to find your server start date"
                dismissable-mask
                modal
              >
                <div class="prose">
                  <p>There are a few ways to do this:</p>
                  <ol>
                    <li>
                      <h3>Check VIP login days</h3>
                      <p>
                        If you joined the server on the day it was created or shortly thereafter, have never transferred, and have logged in daily to claim your VIP points, you can use your VIP login days as a fairly accurate estimate.
                      </p>
                      <Panel
                        toggleable
                        collapsed
                        class="not-prose text-sm"
                      >
                        <template #header>
                          <div class="flex items-center gap-2">
                            <Icon
                              name="bxs:calculator"
                              size="20"
                              class="shrink-0 text-primary"
                            />
                            <h4 class="font-semibold">
                              Calculate from login days
                            </h4>
                          </div>
                        </template>
                        <div
                          v-auto-animate
                          class="flex flex-wrap gap-x-2 gap-y-4 md:gap-x-4"
                        >
                          <InputNumber
                            v-model="loginDays"
                            :allow-empty="false"
                            :min="0"
                            :max="$dayjs().diff($dayjs(WOS_LAUNCH_DATE), 'day')"
                            :use-grouping="false"
                            highlight-on-focus
                            input-class="tabular-nums"
                            show-buttons
                            size="small"
                            suffix=" days"
                            class="w-28"
                            fluid
                          />
                          <div
                            v-if="startDateFromLoginDays "
                            class="flex flex-wrap items-center gap-2 md:gap-4"
                          >
                            <time
                              class="font-bold tabular-nums text-green-500"
                              :datetime="$dayjs(startDateFromLoginDays).utc().format()"
                            >{{ $dayjs(startDateFromLoginDays).format('YYYY-MM-DD') }}</time>
                            <Button
                              label="Use for timeline"
                              variant="outlined"
                              size="small"
                              @click="selectedDate = startDateFromLoginDays; showServerAgeHelpDialog = false"
                            />
                          </div>
                        </div>
                      </Panel>
                    </li>
                    <li>
                      <h3>Check Monument tasks</h3>
                      <ul>
                        <li>
                          <h4>"Kindling Embers"</h4>
                          <p>
                            This event typically occurs on the first day of a new server, but it may take up to three
                            days to complete.
                          </p>
                        </li>
                        <li>
                          <h4>"Beast Hunting"</h4>
                          <p>
                            The date shown, minus ~6 days, should provide a good estimate of when your server was
                            created.
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h3>Check Sunfire Castle</h3>
                      <p>
                        If your server has had at least one Sunfire Castle battle, you
                        can use the following method: Go to the "Battle History" and "Hall of Fame" sections to check the date of
                        the first presidency. Subtract 55 days from this date to get a rough estimate of your state's
                        age.
                      </p>
                      <Panel
                        toggleable
                        collapsed
                        class="not-prose text-sm"
                      >
                        <template #header>
                          <div class="flex items-center gap-2">
                            <Icon
                              name="bxs:calculator"
                              size="20"
                              class="shrink-0 text-primary"
                            />
                            <h4 class="font-semibold">
                              Calculate from Sunfire presidency
                            </h4>
                          </div>
                        </template>
                        <div
                          v-auto-animate
                          class="flex flex-wrap gap-x-2 gap-y-4 md:gap-x-4"
                        >
                          <DatePicker
                            v-model="sfcPresidentDate"
                            :max-date="new Date()"
                            :min-date="$dayjs(WOS_LAUNCH_DATE).add(56, 'day').toDate()"
                            date-format="yy-mm-dd"
                            placeholder="First president date"
                            show-icon
                            size="small"
                          />
                          <div
                            v-if="startDateFromSfcPresidentDate"
                            class="flex flex-wrap items-center gap-2 md:gap-4"
                          >
                            <div>
                              - 55 days = <time
                                class="font-bold tabular-nums text-green-500"
                                :datetime="$dayjs(startDateFromSfcPresidentDate).utc().format()"
                              >{{ $dayjs(startDateFromSfcPresidentDate).format('YYYY-MM-DD') }}</time>
                            </div>
                            <Button
                              label="Use for timeline"
                              variant="outlined"
                              size="small"
                              @click="selectedDate = startDateFromSfcPresidentDate; showServerAgeHelpDialog = false"
                            />
                          </div>
                        </div>
                      </Panel>
                    </li>
                  </ol>
                </div>
              </Dialog>
            </div>
          </div>
          <div
            v-if="selectedDateIsValid"
            class="flex flex-1 basis-auto items-center justify-between gap-2 lg:justify-end lg:gap-4"
          >
            <Button
              v-if="!isToday"
              :label="isMinSmBreakpoint ? 'Go to upcoming milestone' : 'Upcoming milestone'"
              :size="isMinSmBreakpoint ? undefined : 'small'"
              icon-pos="right"
              icon="pi pi-arrows-v"
              rounded
              variant="outlined"
              @click="scrollToNextMilestone"
            />
            <Button
              :icon="isPanelsExpanded ? 'pi pi-minus' : 'pi pi-plus'"
              :label="isPanelsExpanded ? 'Collapse all' : 'Expand all'"
              :size="isMinSmBreakpoint ? undefined : 'small'"
              icon-pos="right"
              rounded
              variant="outlined"
              @click="toggleAllPanels"
            />
          </div>
        </div>
      </div>
    </ClientOnly>

    <div class="grid-cols-[auto_1fr] gap-4 xl:grid">
      <TimelineToc
        v-if="isMinXlBreakpoint && selectedDateIsValid"
        :milestones="processedMilestones"
        :timeline-refs="timelineEntryRefs"
        :active-milestone-id="activeMilestoneId"
      />

      <ClientOnly>
        <Timeline
          v-show="selectedDateIsValid"
          :value="processedMilestones"
          :align="isMinLgBreakpoint ? 'alternate' : 'left'"
          class="mb-4"
        >
          <template #marker="{ item: { hasMileStonePassed, index, type } }">
            <span
              class="z-10 flex size-8 items-center justify-center rounded-full bg-surface-100 sm:size-12"
              :class="{
                'opacity-50 saturate-50': hasMileStonePassed,
                'ring ring-surface-400 drop-shadow-lg': !isToday && nextUpcomingMilestoneIndex === index,
                'ring-2 ring-surface-700': !isToday && nextUpcomingMilestoneIndex !== index,
              }"
            >
              <img
                v-if="type === 'fc'"
                width="28"
                height="28"
                src="/img/fc.webp"
                alt="Fire Crystal"
                class="w-6 drop-shadow sm:w-[rem(30)]"
              >
              <Icon
                v-else
                :name="getMilestoneIcon(type)"
                class="text-2xl text-surface-900 drop-shadow sm:text-3xl"
              />
            </span>
          </template>
          <template #content="{ item: { index, title, day, mileStoneDate, content, hasMileStonePassed } }">
            <Panel
              :id="useKebabCase(title)"
              :ref="(el) => setTimelineEntryRef(index, el as ComponentPublicInstance)"
              class="mb-8 scroll-mt-24"
              :class="{
                'border-surface-400 bg-sky-950 sm:ring-2 sm:ring-surface-400': !isToday && nextUpcomingMilestoneIndex === index,
                'border-surface-900 bg-surface-950': hasMileStonePassed,
              }"
              toggleable
              :collapsed="panelsToggledByUser ? !isPanelsExpanded : hasMileStonePassed"
            >
              <template #header>
                <h4 class="max-sm:text-sm">
                  <strong>Day {{ day }}:</strong> {{ title }}
                </h4>
              </template>
              <div
                class="prose prose-sm hyphens-auto sm:prose-base"
                v-html="content"
              />
              <template #footer>
                <div class="text-right text-sm text-surface-400">
                  Approx. <time :datetime="`${mileStoneDate}T00:00:00Z`">{{ mileStoneDate }}</time> UTC ({{
                    $dayjs.utc(mileStoneDate).from($dayjs.utc()) }})
                </div>
              </template>
            </Panel>
          </template>
        </Timeline>
      </ClientOnly>
    </div>
    <div
      v-show="selectedDateIsValid"
      class="mb-8 text-sm text-primary-emphasis-alt md:text-right"
    >
      Milestone information attributed to the <NuxtLink
        target="_blank"
        to="https://outof.games/realms/whiteoutsurvival/guides/405-server-age-and-timeline-in-whiteout-survival/"
        class="link-primary"
      >
        Server Age and Timeline in Whiteout Survival
      </NuxtLink> guide by <NuxtLink
        target="_blank"
        to="https://outof.games/members/sinti/"
        class="link-primary"
      >
        sinti
      </NuxtLink>
    </div>
    <Divider />
    <figure class="mt-8 space-y-4">
      <div class="overflow-hidden rounded-3xl border-2 border-surface">
        <a
          href="/img/server-timeline@2x.webp"
          :aria-label="SERVER_TIMELINE_IMAGE_LABEL"
          target="_blank"
        >
          <img
            fetchpriority="low"
            loading="lazy"
            src="/img/server-timeline@2x.webp"
            width="2317"
            height="6884"
            :alt="SERVER_TIMELINE_IMAGE_LABEL"
            class="cursor-zoom-in lg:hidden"
          >
        </a>
        <img
          fetchpriority="low"
          loading="lazy"
          src="/img/server-timeline@2x.webp"
          width="2317"
          height="6884"
          :alt="SERVER_TIMELINE_IMAGE_LABEL"
          class="cursor-zoom-in max-lg:hidden"
          @click="showTimelineImageDialog = true"
        >
      </div>
      <figcaption class="text-sm text-primary-emphasis-alt md:text-right ">
        {{ SERVER_TIMELINE_IMAGE_LABEL }}
      </figcaption>
    </figure>
    <Dialog
      v-model:visible="showTimelineImageDialog"
      :header="SERVER_TIMELINE_IMAGE_LABEL"
      dismissable-mask
      modal
      class="p-dialog-maximized"
    >
      <Image
        src="/img/server-timeline@2x.webp"
        :alt="SERVER_TIMELINE_IMAGE_LABEL"
        width="2317"
        height="6884"
        class="block overflow-hidden rounded-xl border border-surface"
      />
    </Dialog>
  </MainContentCard>
</template>

<style scoped lang="postcss">
:deep(.p-timeline) {
  .p-timeline-event-opposite {
    @apply max-lg:hidden;
  }

  .p-timeline-event-content {
    @apply max-lg:pr-px;
  }

  &.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {
    text-align: unset;
  }
}
</style>
