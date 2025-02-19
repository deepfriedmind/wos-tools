<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

import type { BoostTypeValue, ExpeditionSkillOption, ResourceCalculations, ResourceCard, ResourceNode } from '~/types/gathering'
import { BOOST_TYPES } from '~/types/gathering'

useHead({
  title: 'Gathering Amount Calculator',
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
const BASE_TIME_SECONDS = 117_847 // 32:44:7.275
const CITY_BONUS_PERCENT = 100
const travelTimeMinutes = ref(1)
const travelTimeSeconds = ref(0)

const dayjs = useDayjs()

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

const resourceNodes = useLocalStorage<Record<string, ResourceNode>>(`${STORAGE_PREFIX}resource-nodes`, DEFAULT_NODES)

const route = useRoute()
const router = useRouter()

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
    if (!Number.isNaN(boost)) {
      node.boostPercent = boost
    }
  }

  if (route.query[skillLevelKey]) {
    const level = Number(route.query[skillLevelKey])
    if (level >= 1 && level <= 5) {
      node.expeditionSkillLevel = level as ResourceNode['expeditionSkillLevel']
    }
  }
}

watch(resourceNodes, () => {
  router.replace({
    query: {
      ...route.query,
      ...queryParameters.value,
    },
  })
}, { deep: true })

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
  const [initialNode] = nodes
  let fastest = initialNode

  for (const current of nodes) {
    const currentTotal = calculateGatherTime(current, true, true)
    const fastestTime = calculateGatherTime(fastest, true, true)
    if (currentTotal < fastestTime)
      fastest = current
  }

  return fastest
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

  return Number.isNaN(numericAmount) ? true : numericAmount === node.maxAmount
}

function normalizeNumber(number: number) {
  return number <= 0 ? '0' : number.toLocaleString()
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

function selectOnFocus(event: Event) {
  const input = event.target as HTMLInputElement
  input.select()
}

const inputsContainer = ref<HTMLElement>()
const { activate, deactivate } = useFocusTrap(inputsContainer)

onClickOutside(inputsContainer, () => {
  deactivate()
})

function onInputFocus(event: Event) {
  selectOnFocus(event)
  activate()
}

const showGatheringBonusDialog = ref(false)

defineExpose({
  fastestGatheredNode,
  resourceCards,
})
</script>

<template>
  <div class="animate-fadeinright rounded-3xl bg-surface-950/95 p-8 shadow-2xl shadow-blue-200 backdrop-blur-md animate-once">
    <h2 class="mb-2 text-2xl font-medium">
      Gathering Amount Calculator
    </h2>
    <h3 class="mb-12 text-xl">
      How much should I gather from a <strong>lv. 8</strong> resource node to automatically finish just before reset?
    </h3>
    <div
      ref="inputsContainer"
      class="mb-8 flex items-stretch gap-4"
    >
      <div class="flex flex-col justify-around">
        <div class="text-lg">
          Base gathering bonus:<Button
            v-tooltip.top="'Where do I find this?'"
            variant="text"
            rounded
            size="small"
            icon="pi pi-question-circle"
            aria-label="Where do I find this?"
            @click="showGatheringBonusDialog = true"
          />
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
                alt="Screenshot of Bonus Overview screen in game"
              />
            </div>
          </Dialog>
        </div>
        <div class="text-lg">
          Hero expedition skill levels:
        </div>
        <div class="flex translate-y-2 items-center text-lg">
          Travel time to resource node:
        </div>
      </div>

      <div class="space-y-6">
        <div class="flex items-center gap-6">
          <div
            v-for="(node, key) in resourceNodes"
            :key="key"
          >
            <IftaLabel>
              <InputNumber
                v-model="node.boostPercent"
                :name="node.rssName"
                :min="0"
                :step="0.5"
                :min-fraction-digits="0"
                :max-fraction-digits="1"
                input-class="w-32"
                show-buttons
                size="large"
                suffix="%"
                input-mode="decimal"
                @focus="onInputFocus"
              />
              <label
                :for="node.rssName"
                class="flex gap-2"
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

        <div class="flex items-center gap-6">
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
              >
                <template #option="slotProps">
                  <span>{{ slotProps.option.label }}</span>
                  <span class="ml-2 text-sm">{{ `(+${slotProps.option.percentage}%)` }}</span>
                </template>
              </Select>
              <label class="flex gap-2">
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

        <div class="flex items-center gap-4">
          <InputNumber
            v-model="travelTimeMinutes"
            :max="59"
            :min="0"
            :step="1"
            input-class="w-28"
            show-buttons
            size="large"
            suffix=" min"
            @focus="onInputFocus"
          />
          <InputNumber
            v-model="travelTimeSeconds"
            :max="59"
            :min="0"
            :step="1"
            input-class="w-28"
            show-buttons
            size="large"
            suffix=" sec"
            @focus="onInputFocus"
          />

          <div class="text-xs">
            <p>Round trip: <span class="tabular-nums">{{ calculations.travelTimeTotal }}</span></p>
            <p>Available gathering time: <span class="tabular-nums">{{ calculations.availableTime }}</span></p>
          </div>
        </div>
      </div>

      <div>
        <CopyButton
          v-tooltip.top="'Copy link to current settings'"
          success-class="text-green-500"
          copy-string="currentUrl"
          error-class="text-red-500"
          variant="link"
          rounded
          class="ml-[-15px] mt-[-15px] size-12"
        >
          <Icon
            name="fluent:copy-link-24-regular"
            size="24"
            aria-label="Save URL"
          />
        </CopyButton>
      </div>
    </div>

    <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card
        v-for="node in resourceCards"
        :key="node.rssName"
      >
        <template #header>
          <div class="rounded-t-xl bg-gradient-to-bl from-surface-900 to-surface-950 p-2">
            <img
              :src="node.rssImagePath"
              :alt="node.rssName"
              width="52"
              height="52"
              class="mx-auto drop-shadow-lg"
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
              <span
                v-tooltip.top="{
                  value: isMaxAmount(node, amount) ? `Start before ${node.startTimes[label]} (${calculations.timezoneShort})` : undefined,
                  pt: { root: 'max-w-none ', text: 'whitespace-nowrap text-sm' },
                }"
                class="font-medium tabular-nums"
                :class="{
                  'text-green-500': isMaxAmount(node, amount),
                  'text-yellow-500': amount !== '0' && !isMaxAmount(node, amount),
                  'text-red-500': amount === '0',
                }"
              >{{ amount }}</span>
            </li>
          </ul>
        </template>
      </Card>
    </div>

    <Panel
      toggleable
      collapsed
      class="w-max"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <Icon
            name="material-symbols:info-outline-rounded"
            size="20"
            class="text-primary"
          />
          <h4 class="mr-1 text-lg font-bold">
            At what time should I start gathering to automatically finish shortly <em>after</em> reset?
          </h4>
        </div>
      </template>
      <ul class="inline-block list-inside list-disc pl-7">
        <li
          v-for="{ label, time } in calculations.startTimes"
          :key="label"
          class="flex justify-between gap-2"
        >
          <span class="font-medium">{{ label }}:</span>
          <span class="tabular-nums">{{ time }}</span>
        </li>
      </ul>
      <template #footer>
        <div>
          <p class="mb-2 text-sm italic">
            Based on the type of node you gather fastest.<br>
            <ToggleSwitch
              v-model="localSettings.useUtcTime"
              v-tooltip.top="`Switch to ${localSettings.useUtcTime ? 'local time' : 'UTC'}`"
              class="-mr-1 origin-left translate-y-1.5 scale-75"
              aria-label="Toggle between UTC and local time display"
            />Times are in {{ calculations.timezoneShort }} <span v-if="!localSettings.useUtcTime">({{ calculations.timezone }})</span>
          </p>
        </div>
      </template>
    </Panel>
  </div>
</template>
