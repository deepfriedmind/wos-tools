<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

import type { BoostTypeValue, ExpeditionSkillOption, ResourceCalculations, ResourceCard, ResourceNode } from '~/types/gathering'
import { BOOST_TYPES } from '~/types/gathering'

useHead({
  title: 'Gathering Amount Calculator',
})

const STORAGE_PREFIX = 'wos-gather-'
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

const DEFAULT_NODES: Record<string, ResourceNode> = {
  /* eslint-disable perfectionist/sort-objects */
  MEAT: {
    boostPercent: 225.5,
    expeditionSkillLevel: 5,
    heroImagePath: '/img/hero-cloris.webp',
    heroName: 'Cloris',
    maxAmount: 14_000_000,
    rssImagePath: '/img/rss-meat.webp',
    rssName: 'Meat',
  },
  WOOD: {
    boostPercent: 225.5,
    expeditionSkillLevel: 5,
    heroImagePath: '/img/hero-eugene.webp',
    heroName: 'Eugene',
    maxAmount: 14_000_000,
    rssImagePath: '/img/rss-wood.webp',
    rssName: 'Wood',
  },
  COAL: {
    boostPercent: 225,
    expeditionSkillLevel: 5,
    heroImagePath: '/img/hero-charlie.webp',
    heroName: 'Charlie',
    maxAmount: 2_800_000,
    rssImagePath: '/img/rss-coal.webp',
    rssName: 'Coal',
  },
  IRON: {
    boostPercent: 225,
    expeditionSkillLevel: 5,
    heroImagePath: '/img/hero-smith.webp',
    heroName: 'Smith',
    maxAmount: 700_000,
    rssImagePath: '/img/rss-iron.webp',
    rssName: 'Iron',
  },
  /* eslint-enable perfectionist/sort-objects */
}

const resourceNodes = useLocalStorage<Record<string, ResourceNode>>(`${STORAGE_PREFIX}resource-nodes`, DEFAULT_NODES)

const EXPEDITION_SKILL_OPTIONS: ExpeditionSkillOption[] = [
  { label: 'Lv. 1', level: 1, percentage: 5 },
  { label: 'Lv. 2', level: 2, percentage: 10 },
  { label: 'Lv. 3', level: 3, percentage: 15 },
  { label: 'Lv. 4', level: 4, percentage: 20 },
  { label: 'Lv. 5', level: 5, percentage: 25 },
]

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
    const now = new Date()
    const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1))
    const startTimeUTC = new Date(utcMidnight.getTime() - time * 1000)

    return {
      label,
      time: startTimeUTC.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' }),
    }
  })

  return {
    availableTime: availableGatheringSeconds.value > 0 ? dayjs.duration(availableGatheringSeconds.value * 1000).format('HH:mm:ss') : '00:00:00',
    results,
    startTimes,
    timeUntilMidnight: dayjs.duration((availableGatheringSeconds.value + travelTimeTotal.value) * 1000).format('HH:mm:ss'),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneShort: Intl.DateTimeFormat(undefined, { timeZoneName: 'short' }).formatToParts(new Date()).find(part => part.type === 'timeZoneName')?.value,
    travelTimeTotal: totalTravelTimeDuration.value.format('HH:mm:ss'),
  }
})

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
    ...node,
    amounts: {
      /* eslint-disable perfectionist/sort-objects */
      [BOOST_TYPES.NONE]: normalizeNumber(calculateMaxResources(node)),
      [BOOST_TYPES.EXPEDITION]: normalizeNumber(calculateMaxResources(node, true, false)),
      [BOOST_TYPES.CITY]: normalizeNumber(calculateMaxResources(node, false, true)),
      [BOOST_TYPES.BOTH]: normalizeNumber(calculateMaxResources(node, true, true)),
      /* eslint-enable perfectionist/sort-objects */
    } as Record<BoostTypeValue, string>,
  }))
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
          Base gathering boosts:
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
    </div>

    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              class="mx-auto"
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
            name="flat-color-icons:info"
            size="20"
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
        <p class="text-sm italic">
          Based on the type of node you gather fastest.<br>
          Times are in your local timezone: {{ calculations.timezone }} <span v-if="calculations.timezoneShort">({{ calculations.timezoneShort }})</span>
        </p>
      </template>
    </Panel>
  </div>
</template>
