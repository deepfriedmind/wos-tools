<script setup lang="ts">
import { _lg, _sm, _xl } from '#tailwind-config/theme/screens'
import milestones from '~/public/data/server-timeline.json'
import { WOS_LAUNCH_DATE } from '~/utils/constants'

const PAGE_TITLE = 'Server Timeline'
const PAGE_DESCRIPTION = 'Information about the milestones a server/state goes through and when they unlock (approximately)'
const PAGE_ICON = 'mdi:chart-timeline-variant-shimmer'

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

const activeMilestoneId = ref<string | undefined>(undefined)

const {
  isToday,
  selectedDate,
  selectedDateIsValid,
  selectedDayjs,
} = useDateQueryParameter()
const isPanelsExpanded = ref(true)
const panelsToggledByUser = ref(false)

const serverAgeString = computed(() => {
  const diff = dayjs().diff(selectedDayjs.value, 'day')

  return `${diff} ${diff === 1 ? 'day' : 'days'} ago`
})

const timelineEntryReferences = ref<(HTMLElement | null)[]>([])

const processedMilestones = computed(() => {
  if (!milestones || !localSettings.serverStartDate)
    return []

  const startDate = dayjs(localSettings.serverStartDate)
  const currentDate = dayjs()

  return milestones.map((milestone, index) => {
    const milestoneDate = startDate.add(milestone.day, 'day')

    return {
      ...milestone,
      hasMileStonePassed: milestoneDate.isBefore(currentDate, 'day'),
      index,
      mileStoneDate: milestoneDate.format('YYYY-MM-DD'),
    }
  })
})

// Debounced function to update the active milestone ID based on scroll position
// and sync it with the URL hash without causing a page reload or scroll jump.
const debouncedUpdateActiveMilestone = useDebounceFn((newActiveId: string) => {
  if (activeMilestoneId.value !== newActiveId) {
    activeMilestoneId.value = newActiveId

    const isFirstMilestone = processedMilestones.value.length > 0
      && newActiveId === useKebabCase(processedMilestones.value[0].title)

    // Avoid updating hash if it's the first milestone or user is near the top,
    // prevents unnecessary hash changes on initial load or minor scrolls at the top.
    if (isFirstMilestone || (import.meta.client && window.scrollY < 100)) {
      return history.replaceState(undefined, '', `${route.path}${Object.keys(route.query).length > 0 ? `?${new URLSearchParams(route.query as Record<string, string>).toString()}` : ''}`)
    }

    if (route.hash !== `#${newActiveId}`) {
      history.replaceState(undefined, '', `#${newActiveId}`)
    }
  }
}, 150)

watch(selectedDayjs, () => {
  panelsToggledByUser.value = false
})

onMounted(() => {
  setIsStickyHeaderEnabled(false)
})

onUnmounted(() => {
  setIsStickyHeaderEnabled(true)
})

// Observe timeline entries to update the active milestone for the TOC
useIntersectionObserver(
  timelineEntryReferences,
  (entries) => {
    const visibleEntries = entries.filter(entry => entry.isIntersecting)

    if (visibleEntries.length > 0) {
      // Find the entry that is visually highest on the screen (smallest top value)
      // among those currently intersecting the rootMargin line. This ensures the
      // "active" item in the TOC corresponds to the item nearest the top edge
      // of the intersection viewport.
      const highestEntry = useMinBy(visibleEntries, entry => entry.boundingClientRect.top)

      if (highestEntry?.target.id) {
        const newActiveId = highestEntry.target.id
        debouncedUpdateActiveMilestone(newActiveId)
      }
    }
  },
  {
    // rootMargin defines the intersection viewport:
    // - Top: -150px (starts 150px below the actual viewport top)
    // - Bottom: -100% (ends at the viewport top, effectively only tracking items crossing the top boundary)
    // This setup focuses on detecting which item is currently at or near the top edge defined by rootMargin.
    rootMargin: '-150px 0px -100% 0px',
    threshold: 0, // Trigger as soon as any part intersects
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
    const element = timelineEntryReferences.value[nextUpcomingMilestoneIndex.value]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

function toggleAllPanels() {
  panelsToggledByUser.value = true
  isPanelsExpanded.value = !isPanelsExpanded.value
}

// Reset card references when milestones change
watch(processedMilestones, () => {
  timelineEntryReferences.value = []
})

const showTimelineImageDialog = ref(false)
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
        :timeline-refs="timelineEntryReferences"
        :active-milestone-id="activeMilestoneId"
      />

      <ClientOnly>
      <Timeline
        v-show="selectedDateIsValid"
        :value="processedMilestones"
        :align="isMinLgBreakpoint ? 'alternate' : 'left'"
        class="mb-4"
      >
        <template #marker="{ item: { hasMileStonePassed, index } }">
          <span
            class="z-10 flex size-8 items-center justify-center rounded-full bg-slate-900 shadow"
            :class="{
              'ring-2 ring-surface-400 drop-shadow-lg': nextUpcomingMilestoneIndex === index,
            }"
          >
            <Icon
              size="24"
              :name="hasMileStonePassed ? 'fluent:checkmark-circle-12-regular' : 'fluent-emoji:snowflake'"
              class="text-surface-900"
            />
          </span>
        </template>
        <template #content="{ item: { index, title, day, mileStoneDate, content, hasMileStonePassed } }">
          <Panel
            :id="useKebabCase(title)"
            :ref="(el) => {
              if (el) {
                timelineEntryReferences[index] = '$el' in el ? el.$el : el;
              }
              else {
                timelineEntryReferences[index] = null;
              }
            }"
            class="mb-8 scroll-mt-24"
            :class="{
              'border-2 border-surface-400 bg-surface-800': nextUpcomingMilestoneIndex === index,
              'border-surface-900 bg-surface-950': hasMileStonePassed,
            }"
            toggleable
            :collapsed="panelsToggledByUser ? !isPanelsExpanded : hasMileStonePassed"
          >
            <template #header>
              <h4><strong>Day {{ day }}:</strong> {{ title }}</h4>
            </template>
            <div
              class="prose prose-sm sm:prose-base"
              v-html="content"
            />
            <template #footer>
              <div class="flex justify-end whitespace-pre text-sm text-surface-400">
                Approx. <time :datetime="`${mileStoneDate}T00:00:00Z`">{{ mileStoneDate }}</time> UTC ({{ $dayjs.utc(mileStoneDate).from($dayjs.utc()) }})
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
          aria-label="Server timeline illustration from the Whiteout Survival Discord server"
          target="_blank"
        >
          <img
            fetchpriority="low"
            loading="lazy"
            src="/img/server-timeline@2x.webp"
            width="2317"
            height="6884"
            alt="Server timeline illustration from the Whiteout Survival Discord server"
            class="cursor-zoom-in lg:hidden"
          >
        </a>
        <img
          fetchpriority="low"
          loading="lazy"
          src="/img/server-timeline@2x.webp"
          width="2317"
          height="6884"
          alt="Server timeline illustration from the Whiteout Survival Discord server"
          class="cursor-zoom-in max-lg:hidden"
          @click="showTimelineImageDialog = true"
        >
      </div>
      <figcaption class="text-sm text-primary-emphasis-alt md:text-right ">
        Server timeline illustration from the Whiteout Survival Discord server
      </figcaption>
    </figure>
    <Dialog
      v-model:visible="showTimelineImageDialog"
      header="Server timeline illustration from the Whiteout Survival Discord server"
      dismissable-mask
      modal
      class="p-dialog-maximized"
    >
      <Image
        src="/img/server-timeline@2x.webp"
        alt="Server timeline illustration from the Whiteout Survival Discord server"
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

  &.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {
    text-align: unset;
  }
}
</style>
