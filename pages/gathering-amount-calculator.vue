<script setup lang="ts">
import type { BoostTypeValue, ExpeditionSkillOption, ResourceCalculations, ResourceCard, ResourceNode } from '~/types/gathering'
import { BOOST_TYPES } from '~/types/gathering'

const PAGE_TITLE = 'Gathering Amount Calculator'
const PAGE_DESCRIPTION = 'Calculate how much to gather from a lv. 8 resource node to finish just before reset'
const PAGE_ICON = 'fluent-emoji:axe'

definePageMeta({
  description: `${PAGE_DESCRIPTION} in Whiteout Survival.`,
  icon: PAGE_ICON,
  title: `${PAGE_TITLE} for Whiteout Survival`,
})

const DEFAULT_NODES: Record<string, ResourceNode> = {
  /* eslint-disable perfectionist/sort-objects */
  MEAT: {
    boostPercent: 100,
    expeditionSkillLevel: 5,
    heroImagePath: '/img/hero-cloris.webp',
    heroName: 'Cloris',
    maxAmount: 14_000_000,
    rssImagePath: '/img/rss-meat.webp',
    rssName: 'Meat',
  },
  WOOD: {
    boostPercent: 100,
    expeditionSkillLevel: 5,
    heroImagePath: '/img/hero-eugene.webp',
    heroName: 'Eugene',
    maxAmount: 14_000_000,
    rssImagePath: '/img/rss-wood.webp',
    rssName: 'Wood',
  },
  COAL: {
    boostPercent: 100,
    expeditionSkillLevel: 5,
    heroImagePath: '/img/hero-charlie.webp',
    heroName: 'Charlie',
    maxAmount: 2_800_000,
    rssImagePath: '/img/rss-coal.webp',
    rssName: 'Coal',
  },
  IRON: {
    boostPercent: 100,
    expeditionSkillLevel: 5,
    heroImagePath: '/img/hero-smith.webp',
    heroName: 'Smith',
    maxAmount: 700_000,
    rssImagePath: '/img/rss-iron.webp',
    rssName: 'Iron',
  },
  /* eslint-enable perfectionist/sort-objects */
}

const EXPEDITION_SKILL_OPTIONS: ExpeditionSkillOption[] = [
  { label: 'Lv. 1', level: 1, percentage: 5 },
  { label: 'Lv. 2', level: 2, percentage: 10 },
  { label: 'Lv. 3', level: 3, percentage: 15 },
  { label: 'Lv. 4', level: 4, percentage: 20 },
  { label: 'Lv. 5', level: 5, percentage: 25 },
]

const STORAGE_PREFIX = useRuntimeConfig().public.storagePrefix
const BASE_TIME_SECONDS = 117_847 // 32:44:7.275 = magic in-game number
const CITY_BONUS_PERCENT = 100
const travelTimeMinutes = shallowRef(1)
const travelTimeSeconds = shallowRef(0)

const route = useRoute()
const router = useRouter()
const dayjs = useDayjs()
const { mobileScrollIntoView } = useMobileScrollIntoView()

const travelTimeTotal = computed(() => dayjs.duration({
  minutes: travelTimeMinutes.value,
  seconds: travelTimeSeconds.value,
}).asSeconds() * 2)

const totalTravelTimeDuration = computed(() => dayjs.duration(travelTimeTotal.value * 1000))

const { error, secondsUntilReset } = useResetCountdown()
const availableGatheringSeconds = computed(() => {
  if (error.value)
    return 24 * 3600 - travelTimeTotal.value // Default to 24 hours if there's an error

  return secondsUntilReset.value - travelTimeTotal.value
})

const resourceNodes = useLocalStorage<Record<string, ResourceNode>>(`${STORAGE_PREFIX}gathering-settings`, DEFAULT_NODES, {
  initOnMounted: true,
})

const queryParameters = computed(() => {
  const parameters: Record<string, string> = {}

  for (const [key, node] of Object.entries(resourceNodes.value)) {
    parameters[`${key.toLowerCase()}_boost`] = node.boostPercent.toString()
    parameters[`${key.toLowerCase()}_skill`] = node.expeditionSkillLevel.toString()
  }

  return parameters
})

for (const [key, node] of Object.entries(resourceNodes.value)) {
  const boostKey = `${key.toLowerCase()}_boost`
  const skillLevelKey = `${key.toLowerCase()}_skill`

  if (route.query[boostKey]) {
    const boost = Number(route.query[boostKey])

    if (!Number.isNaN(boost))
      node.boostPercent = boost
  }

  if (route.query[skillLevelKey]) {
    const level = Number(route.query[skillLevelKey])

    if (level >= 1 && level <= 5)
      node.expeditionSkillLevel = level as ResourceNode['expeditionSkillLevel']
  }
}

watchDebounced(resourceNodes, () => {
  router.replace({
    query: {
      ...route.query,
      ...queryParameters.value,
    },
  })
}, { debounce: 250, deep: true })

function calculateGatherTime(node: ResourceNode, useExpeditionBoost = false, useCityBonus = false) {
  let totalBoostPercent = node.boostPercent
  if (useExpeditionBoost) {
    const skillOption = EXPEDITION_SKILL_OPTIONS.find(opt => opt.level === node.expeditionSkillLevel)

    if (skillOption)
      totalBoostPercent += skillOption.percentage
  }

  if (useCityBonus)
    totalBoostPercent += CITY_BONUS_PERCENT

  return BASE_TIME_SECONDS / (1 + totalBoostPercent / 100)
}

function calculateMaxResources(node: ResourceNode, useExpeditionBoost = false, useCityBonus = false) {
  const gatherTime = calculateGatherTime(node, useExpeditionBoost, useCityBonus)

  if (availableGatheringSeconds.value >= gatherTime)
    return node.maxAmount

  const timeRatio = availableGatheringSeconds.value / gatherTime

  return Math.floor(node.maxAmount * timeRatio)
}

const fastestGatheredNode = computed(() => {
  const nodes = Object.values(resourceNodes.value)

  return useMinBy(nodes, node => calculateGatherTime(node, true, true)) ?? nodes[0]
})

const { localSettings } = useLocalSettings()

const calculations = computed<ResourceCalculations>(() => {
  const results = Object.values(resourceNodes.value).map(node => ({
    /* eslint-disable perfectionist/sort-objects */
    Resource: node.rssName,
    [BOOST_TYPES.NONE]: normalizeNumber(calculateMaxResources(node)),
    [BOOST_TYPES.EXPEDITION]: normalizeNumber(calculateMaxResources(node, true, false)),
    [BOOST_TYPES.CITY]: normalizeNumber(calculateMaxResources(node, false, true)),
    [BOOST_TYPES.BOTH]: normalizeNumber(calculateMaxResources(node, true, true)),
    /* eslint-enable perfectionist/sort-objects */
  }))

  const gatherTimes: Record<BoostTypeValue, number> = {
    /* eslint-disable perfectionist/sort-objects */
    [BOOST_TYPES.NONE]: calculateGatherTime(fastestGatheredNode.value),
    [BOOST_TYPES.EXPEDITION]: calculateGatherTime(fastestGatheredNode.value, true),
    [BOOST_TYPES.CITY]: calculateGatherTime(fastestGatheredNode.value, false, true),
    [BOOST_TYPES.BOTH]: calculateGatherTime(fastestGatheredNode.value, true, true),
    /* eslint-enable perfectionist/sort-objects */
  }

  const startTimes = Object.entries(gatherTimes).map(([label, time]) => {
    const now = dayjs()
    const utcMidnight = now.utc().add(1, 'day').startOf('day')
    const startTimeUTC = utcMidnight.subtract(time, 'seconds').toDate()

    return {
      label,
      time: localSettings.useUtcTime ?
          dayjs(startTimeUTC).utc().format(TIME_FORMATS.SHORT_TIME)
        : startTimeUTC.toLocaleTimeString(undefined, localSettings.use24HourFormat ?
            TIME_DISPLAY_OPTIONS.HOUR_24
            : TIME_DISPLAY_OPTIONS.HOUR_12),
    }
  })

  return {
    availableTime: availableGatheringSeconds.value > 0 ? dayjs.duration(availableGatheringSeconds.value * 1000).format(TIME_FORMATS.LONG_TIME) : '00:00:00',
    results,
    startTimes,
    timeUntilMidnight: dayjs.duration((availableGatheringSeconds.value + travelTimeTotal.value) * 1000).format(TIME_FORMATS.LONG_TIME),
    timezone: localSettings.useUtcTime ? 'UTC' : localSettings.timezone,
    timezoneShort: localSettings.useUtcTime ? 'UTC' : localSettings.timezoneShort,
    travelTimeTotal: totalTravelTimeDuration.value.format(TIME_FORMATS.LONG_TIME),
  }
})

function calculateLatestStartTime(node: ResourceNode, boostType: BoostTypeValue) {
  const useExpeditionBoost = boostType === BOOST_TYPES.EXPEDITION || boostType === BOOST_TYPES.BOTH
  const useCityBonus = boostType === BOOST_TYPES.CITY || boostType === BOOST_TYPES.BOTH
  const gatherTime = calculateGatherTime(node, useExpeditionBoost, useCityBonus)

  const now = dayjs()
  const utcMidnight = now.utc().add(1, 'day').startOf('day')
  const startTimeUTC = utcMidnight.subtract(gatherTime + travelTimeTotal.value, 'seconds').toDate()

  return localSettings.useUtcTime ?
      dayjs(startTimeUTC).utc().format(TIME_FORMATS.SHORT_TIME)
    : startTimeUTC.toLocaleTimeString(undefined, localSettings.use24HourFormat ?
        TIME_DISPLAY_OPTIONS.HOUR_24
        : TIME_DISPLAY_OPTIONS.HOUR_12)
}

function isMaxAmount(node: ResourceNode, amount: string) {
  const numericAmount = Number.parseInt(amount.replaceAll(/\D/g, ''))

  return Number.isNaN(numericAmount) || numericAmount === node.maxAmount
}

function normalizeNumber(number: number) {
  return number <= 0 ? '0' : formatNumber(number)
}

const resourceCards = computed<ResourceCard[]>(() => {
  const nodes = Object.values(resourceNodes.value)

  return nodes.map(node => ({
    /* eslint-disable perfectionist/sort-objects */
    ...node,
    amounts: {
      [BOOST_TYPES.NONE]: normalizeNumber(calculateMaxResources(node)),
      [BOOST_TYPES.EXPEDITION]: normalizeNumber(calculateMaxResources(node, true, false)),
      [BOOST_TYPES.CITY]: normalizeNumber(calculateMaxResources(node, false, true)),
      [BOOST_TYPES.BOTH]: normalizeNumber(calculateMaxResources(node, true, true)),
    } as Record<BoostTypeValue, string>,
    startTimes: {
      [BOOST_TYPES.NONE]: calculateLatestStartTime(node, BOOST_TYPES.NONE),
      [BOOST_TYPES.EXPEDITION]: calculateLatestStartTime(node, BOOST_TYPES.EXPEDITION),
      [BOOST_TYPES.CITY]: calculateLatestStartTime(node, BOOST_TYPES.CITY),
      [BOOST_TYPES.BOTH]: calculateLatestStartTime(node, BOOST_TYPES.BOTH),
    } as Record<BoostTypeValue, string>,
  }))
  /* eslint-enable perfectionist/sort-objects */
})

const showGatheringBonusDialog = shallowRef(false)
</script>

<template>
  <MainContentCard
    :icon="PAGE_ICON"
    :heading="PAGE_TITLE"
    :sub-heading="PAGE_DESCRIPTION"
  >
    <CopyButton
      v-if="route.query.meat_boost"
      v-tooltip="'Copy link to current settings'"
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

    <div class="space-y-12">
      <div class="space-y-8">
        <div class="space-y-8">
          <div class="flex gap-4 max-md:flex-col md:items-center">
            <div class="text-lg lg:w-64">
              Base gathering bonus:<Button
                v-tooltip="'Where do I find this?'"
                aria-label="Where do I find this?"
                icon="pi pi-question-circle"
                rounded
                variant="text"
                @click="showGatheringBonusDialog = true"
              />
            </div>
            <Dialog
              v-model:visible="showGatheringBonusDialog"
              modal
              dismissable-mask
              header="Where do I find my base gathering bonus?"
            >
              <div class="flex justify-center">
                <Image
                  preview
                  class="overflow-hidden rounded-xl border border-surface"
                  src="/img/bonus-overview-gathering@2x.webp"
                  width="592"
                  height="1049"
                  alt="Screenshot of Bonus Overview screen in Whiteout Survival"
                />
              </div>
            </Dialog>
            <div class="flex flex-wrap items-center gap-6">
              <div
                v-for="(node, key) in resourceNodes"
                :key="key"
              >
                <IftaLabel>
                  <InputNumber
                    v-model="node.boostPercent"
                    highlight-on-focus
                    :max-fraction-digits="1"
                    :min-fraction-digits="0"
                    :min="0"
                    :input-id="useKebabCase(node.rssName)"
                    :step="0.5"
                    class="w-32"
                    fluid
                    input-class="tabular-nums scroll-m-1"
                    input-mode="decimal"
                    show-buttons
                    size="large"
                    suffix="%"
                    @focus="mobileScrollIntoView"
                  />
                  <label
                    :for="useKebabCase(node.rssName)"
                    class="flex gap-2 font-bold tracking-wide"
                  >
                    <div>{{ node.rssName }}</div>
                    <img
                      :src="node.rssImagePath"
                      :alt="node.rssName"
                      width="22"
                      height="22"
                      class="-translate-y-1"
                    >
                  </label>
                </IftaLabel>
              </div>
            </div>
          </div>

          <div class="flex gap-4 max-md:flex-col md:items-center">
            <div class="text-lg lg:w-64">
              Hero expedition skill levels:
            </div>
            <div class="flex flex-wrap items-center gap-6">
              <div
                v-for="(node, key) in resourceNodes"
                :key="key"
              >
                <IftaLabel>
                  <Select
                    v-model="node.expeditionSkillLevel"
                    :options="EXPEDITION_SKILL_OPTIONS"
                    option-label="label"
                    option-value="level"
                    class="w-32"
                    :aria-label="node.heroName"
                  >
                    <template #option="slotProps">
                      <span>{{ slotProps.option.label }}</span>
                      <span class="ml-2 text-sm">{{ `(+${slotProps.option.percentage}%)` }}</span>
                    </template>
                  </Select>
                  <label class="flex gap-2 font-bold tracking-wide">
                    <div>{{ node.heroName }}</div>
                    <img
                      :src="node.heroImagePath"
                      :alt="node.heroName"
                      width="22"
                      height="22"
                      class="-translate-y-1 rounded-full"
                    >
                  </label>
                </IftaLabel>
              </div>
            </div>
          </div>

          <div class="flex gap-4 max-md:flex-col md:items-center">
            <div class="text-lg lg:w-64">
              Travel time to resource node:
            </div>
            <div class="flex flex-wrap items-center gap-4">
              <InputNumber
                v-model="travelTimeMinutes"
                :max="59"
                :min="0"
                :step="1"
                class="w-28"
                fluid
                highlight-on-focus
                input-class="scroll-m-1"
                show-buttons
                size="large"
                suffix=" min"
                @focus="mobileScrollIntoView"
              />
              <InputNumber
                v-model="travelTimeSeconds"
                :max="59"
                :min="0"
                :step="1"
                class="w-28"
                fluid
                highlight-on-focus
                input-class="scroll-m-1"
                show-buttons
                size="large"
                suffix=" sec"
                @focus="mobileScrollIntoView"
              />
              <ClientOnly>
                <div class="space-y-1 text-xs">
                  <p>Round trip: <span class="tabular-nums">{{ calculations.travelTimeTotal }}</span></p>
                  <p>Available gathering time: <span class="tabular-nums">{{ calculations.availableTime }}</span></p>
                </div>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          v-for="node in resourceCards"
          :key="node.rssName"
        >
          <template #header>
            <div class="h-20 animate-gradient rounded-t-xl bg-gradient-to-bl from-surface-950 via-surface-900 to-surface-950 bg-[length:100%_400%] p-2">
              <img
                :src="node.rssImagePath"
                :alt="node.rssName"
                class="mx-auto h-[140%] drop-shadow-lg"
              >
            </div>
          </template>
          <template #title>
            {{ node.rssName }}
          </template>
          <template #content>
            <ul class="m-0 list-none space-y-2 p-0">
              <li
                v-for="(amount, label) in node.amounts"
                :key="label"
                class="flex items-center justify-between"
              >
                <span class="text-sm">{{ label }}:</span>
                <ClientOnly>
                  <span
                    v-tooltip="isMaxAmount(node, amount) ? `Start before ${node.startTimes[label]} (${calculations.timezoneShort})` : undefined"
                    class="select-none font-medium tabular-nums"
                    :class="{
                      'text-green-500': isMaxAmount(node, amount),
                      'text-yellow-500': amount !== '0' && !isMaxAmount(node, amount),
                      'text-red-500': amount === '0',
                    }"
                  >{{ amount }}</span>
                </ClientOnly>
              </li>
            </ul>
          </template>
        </Card>
      </div>
      <Panel
        toggleable
        collapsed
        class="lg:w-max"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <Icon
              name="fluent-emoji:snowflake"
              size="20"
              class="shrink-0 text-primary max-sm:hidden"
            />
            <h4 class="mr-1 font-semibold sm:text-lg/snug">
              At what time should I start gathering to automatically finish shortly <em>after</em> reset?
            </h4>
          </div>
        </template>
        <ClientOnly>
          <ul class="inline-block sm:pl-8">
            <li
              v-for="{ label, time } in calculations.startTimes"
              :key="label"
              class="flex justify-between gap-2"
            >
              <span class="font-medium">{{ label }}:</span>
              <span class="tabular-nums">{{ time }}</span>
            </li>
          </ul>
        </ClientOnly>
        <template #footer>
          <TimezoneToggle />
          <p class="mt-4 text-sm italic">
            Based on the type of node you gather fastest.
          </p>
        </template>
      </Panel>
    </div>
  </MainContentCard>
</template>
