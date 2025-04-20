<script setup lang="ts">
const PAGE_TITLE = 'Chief Gear Upgrade Calculator'
const PAGE_DESCRIPTION = 'Calculate the material costs for upgrading Chief Gear'
const PAGE_ICON = 'game-icons:pirate-coat'
const PAGE_ICON_COLOR_CLASS = 'text-yellow-700'

definePageMeta({
  description: `${PAGE_DESCRIPTION} in Whiteout Survival.`,
  icon: PAGE_ICON,
  iconColorClass: PAGE_ICON_COLOR_CLASS,
  title: `${PAGE_TITLE} for Whiteout Survival`,
})

// --- Types ---

interface CalculatedCost {
  steps: { cumulativeCost: UpgradeCost, level: UpgradeLevel }[]
  total: UpgradeCost
}

interface CalculatorState {
  gear: {
    coat: GearSelection
    cudgel: GearSelection
    hat: GearSelection
    pants: GearSelection
    ring: GearSelection
    watch: GearSelection
  }
  inventory: UpgradeCost
}

interface GearPiece {
  icon: string
  id: keyof CalculatorState['gear']
  name: string
  stats: string
}

interface GearSelection {
  from: string | undefined
  to: string | undefined
}

interface LevelGroupOption {
  levels: LevelOption[]
  tier: string
}

interface LevelOption {
  id: string
  label: string
}

type Material = keyof UpgradeCost

interface UpgradeCost {
  designPlans: number
  hardenedAlloy: number
  lunarAmber: number
  polishingSolution: number
}

interface UpgradeLevel {
  baseTier: string // e.g., 'Green', 'Blue', 'Purple', 'Gold', 'Red'
  cost: UpgradeCost // Cost to reach THIS level from the PREVIOUS one
  id: string // e.g., 'green_0', 'blue_3', 'red_t1_1'
  index: number // Added index for easier comparison
  label: string // e.g., 'Green', 'Green 1-Star', 'Blue 3-Star', 'Red T3 1-Star'
  stars: number // 0-3
  tier: string // e.g., 'Green', 'Blue', 'Purple T1', 'Red T3'
}

// --- Constants & Data ---

const GEAR_PIECES: GearPiece[] = [
  { icon: 'game-icons:winter-hat', id: 'hat', name: 'Winter Hat', stats: 'lancer attack/defense' },
  { icon: 'game-icons:pirate-coat', id: 'coat', name: 'Valor\'s Embrace', stats: 'infantry attack/defense' },
  { icon: 'game-icons:power-ring', id: 'ring', name: 'Ring of Resilience', stats: 'marksman attack/defense' },
  { icon: 'game-icons:pocket-watch', id: 'watch', name: 'Durable Watch', stats: 'lancer attack/defense' },
  { icon: 'game-icons:armored-pants', id: 'pants', name: 'Explorer Pants', stats: 'infantry attack/defense' },
  { icon: 'game-icons:wood-club', id: 'cudgel', name: 'Cudgel', stats: 'marksman attack/defense' },
]

const MATERIALS: { key: Material, label: string }[] = [
  { key: 'hardenedAlloy', label: 'Hardened Alloy' },
  { key: 'polishingSolution', label: 'Polishing Solution' },
  { key: 'designPlans', label: 'Design Plans' },
  { key: 'lunarAmber', label: 'Lunar Amber' },
]

// Cost represents the cost to upgrade *to* this level from the previous one
const UPGRADE_DATA_RAW: Array<
  Omit<UpgradeLevel, 'baseTier' | 'index'>
> = [
  { cost: { designPlans: 0, hardenedAlloy: 1500, lunarAmber: 0, polishingSolution: 15 }, id: 'green_0', label: 'Green', stars: 0, tier: 'Green' },
  { cost: { designPlans: 0, hardenedAlloy: 3800, lunarAmber: 0, polishingSolution: 40 }, id: 'green_1', label: 'Green 1-Star', stars: 1, tier: 'Green' },
  { cost: { designPlans: 0, hardenedAlloy: 7000, lunarAmber: 0, polishingSolution: 70 }, id: 'blue_0', label: 'Blue', stars: 0, tier: 'Blue' },
  { cost: { designPlans: 0, hardenedAlloy: 9700, lunarAmber: 0, polishingSolution: 95 }, id: 'blue_1', label: 'Blue 1-Star', stars: 1, tier: 'Blue' },
  { cost: { designPlans: 45, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }, id: 'blue_2', label: 'Blue 2-Star', stars: 2, tier: 'Blue' },
  { cost: { designPlans: 50, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }, id: 'blue_3', label: 'Blue 3-Star', stars: 3, tier: 'Blue' },
  { cost: { designPlans: 60, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }, id: 'purple_0', label: 'Purple', stars: 0, tier: 'Purple' },
  { cost: { designPlans: 70, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }, id: 'purple_1', label: 'Purple 1-Star', stars: 1, tier: 'Purple' },
  { cost: { designPlans: 40, hardenedAlloy: 6500, lunarAmber: 0, polishingSolution: 65 }, id: 'purple_2', label: 'Purple 2-Star', stars: 2, tier: 'Purple' },
  { cost: { designPlans: 50, hardenedAlloy: 8000, lunarAmber: 0, polishingSolution: 80 }, id: 'purple_3', label: 'Purple 3-Star', stars: 3, tier: 'Purple' },
  { cost: { designPlans: 60, hardenedAlloy: 10_000, lunarAmber: 0, polishingSolution: 95 }, id: 'purple_t1_0', label: 'Purple T1', stars: 0, tier: 'Purple T1' },
  { cost: { designPlans: 70, hardenedAlloy: 11_000, lunarAmber: 0, polishingSolution: 110 }, id: 'purple_t1_1', label: 'Purple T1 1-Star', stars: 1, tier: 'Purple T1' },
  { cost: { designPlans: 85, hardenedAlloy: 13_000, lunarAmber: 0, polishingSolution: 130 }, id: 'purple_t1_2', label: 'Purple T1 2-Star', stars: 2, tier: 'Purple T1' },
  { cost: { designPlans: 100, hardenedAlloy: 15_000, lunarAmber: 0, polishingSolution: 160 }, id: 'purple_t1_3', label: 'Purple T1 3-Star', stars: 3, tier: 'Purple T1' },
  { cost: { designPlans: 40, hardenedAlloy: 22_000, lunarAmber: 0, polishingSolution: 220 }, id: 'gold_0', label: 'Gold', stars: 0, tier: 'Gold' },
  { cost: { designPlans: 40, hardenedAlloy: 23_000, lunarAmber: 0, polishingSolution: 230 }, id: 'gold_1', label: 'Gold 1-Star', stars: 1, tier: 'Gold' },
  { cost: { designPlans: 45, hardenedAlloy: 25_000, lunarAmber: 0, polishingSolution: 250 }, id: 'gold_2', label: 'Gold 2-Star', stars: 2, tier: 'Gold' },
  { cost: { designPlans: 45, hardenedAlloy: 26_000, lunarAmber: 0, polishingSolution: 260 }, id: 'gold_3', label: 'Gold 3-Star', stars: 3, tier: 'Gold' },
  { cost: { designPlans: 45, hardenedAlloy: 28_000, lunarAmber: 0, polishingSolution: 280 }, id: 'gold_t1_0', label: 'Gold T1', stars: 0, tier: 'Gold T1' },
  { cost: { designPlans: 55, hardenedAlloy: 30_000, lunarAmber: 0, polishingSolution: 300 }, id: 'gold_t1_1', label: 'Gold T1 1-Star', stars: 1, tier: 'Gold T1' },
  { cost: { designPlans: 55, hardenedAlloy: 32_000, lunarAmber: 0, polishingSolution: 320 }, id: 'gold_t1_2', label: 'Gold T1 2-Star', stars: 2, tier: 'Gold T1' },
  { cost: { designPlans: 55, hardenedAlloy: 35_000, lunarAmber: 0, polishingSolution: 340 }, id: 'gold_t1_3', label: 'Gold T1 3-Star', stars: 3, tier: 'Gold T1' },
  { cost: { designPlans: 55, hardenedAlloy: 38_000, lunarAmber: 0, polishingSolution: 360 }, id: 'gold_t2_0', label: 'Gold T2', stars: 0, tier: 'Gold T2' },
  { cost: { designPlans: 75, hardenedAlloy: 43_000, lunarAmber: 0, polishingSolution: 430 }, id: 'gold_t2_1', label: 'Gold T2 1-Star', stars: 1, tier: 'Gold T2' },
  { cost: { designPlans: 80, hardenedAlloy: 45_000, lunarAmber: 0, polishingSolution: 460 }, id: 'gold_t2_2', label: 'Gold T2 2-Star', stars: 2, tier: 'Gold T2' },
  { cost: { designPlans: 85, hardenedAlloy: 48_000, lunarAmber: 0, polishingSolution: 500 }, id: 'gold_t2_3', label: 'Gold T2 3-Star', stars: 3, tier: 'Gold T2' },
  { cost: { designPlans: 85, hardenedAlloy: 50_000, lunarAmber: 10, polishingSolution: 530 }, id: 'red_0', label: 'Red', stars: 0, tier: 'Red' },
  { cost: { designPlans: 90, hardenedAlloy: 52_000, lunarAmber: 10, polishingSolution: 560 }, id: 'red_1', label: 'Red 1-Star', stars: 1, tier: 'Red' },
  { cost: { designPlans: 95, hardenedAlloy: 54_000, lunarAmber: 10, polishingSolution: 590 }, id: 'red_2', label: 'Red 2-Star', stars: 2, tier: 'Red' },
  { cost: { designPlans: 100, hardenedAlloy: 56_000, lunarAmber: 10, polishingSolution: 620 }, id: 'red_3', label: 'Red 3-Star', stars: 3, tier: 'Red' },
  { cost: { designPlans: 110, hardenedAlloy: 59_000, lunarAmber: 15, polishingSolution: 670 }, id: 'red_t1_0', label: 'Red T1', stars: 0, tier: 'Red T1' },
  { cost: { designPlans: 115, hardenedAlloy: 61_000, lunarAmber: 15, polishingSolution: 700 }, id: 'red_t1_1', label: 'Red T1 1-Star', stars: 1, tier: 'Red T1' },
  { cost: { designPlans: 120, hardenedAlloy: 63_000, lunarAmber: 15, polishingSolution: 730 }, id: 'red_t1_2', label: 'Red T1 2-Star', stars: 2, tier: 'Red T1' },
  { cost: { designPlans: 125, hardenedAlloy: 65_000, lunarAmber: 15, polishingSolution: 760 }, id: 'red_t1_3', label: 'Red T1 3-Star', stars: 3, tier: 'Red T1' },
  { cost: { designPlans: 135, hardenedAlloy: 68_000, lunarAmber: 20, polishingSolution: 810 }, id: 'red_t2_0', label: 'Red T2', stars: 0, tier: 'Red T2' },
  { cost: { designPlans: 140, hardenedAlloy: 70_000, lunarAmber: 20, polishingSolution: 840 }, id: 'red_t2_1', label: 'Red T2 1-Star', stars: 1, tier: 'Red T2' },
  { cost: { designPlans: 145, hardenedAlloy: 72_000, lunarAmber: 20, polishingSolution: 870 }, id: 'red_t2_2', label: 'Red T2 2-Star', stars: 2, tier: 'Red T2' },
  { cost: { designPlans: 150, hardenedAlloy: 74_000, lunarAmber: 20, polishingSolution: 900 }, id: 'red_t2_3', label: 'Red T2 3-Star', stars: 3, tier: 'Red T2' },
  { cost: { designPlans: 160, hardenedAlloy: 77_000, lunarAmber: 25, polishingSolution: 950 }, id: 'red_t3_0', label: 'Red T3', stars: 0, tier: 'Red T3' },
  { cost: { designPlans: 165, hardenedAlloy: 80_000, lunarAmber: 25, polishingSolution: 990 }, id: 'red_t3_1', label: 'Red T3 1-Star', stars: 1, tier: 'Red T3' },
  { cost: { designPlans: 170, hardenedAlloy: 83_000, lunarAmber: 25, polishingSolution: 1030 }, id: 'red_t3_2', label: 'Red T3 2-Star', stars: 2, tier: 'Red T3' },
  { cost: { designPlans: 180, hardenedAlloy: 86_000, lunarAmber: 25, polishingSolution: 1070 }, id: 'red_t3_3', label: 'Red T3 3-Star', stars: 3, tier: 'Red T3' },
]

// Helper to extract base tier (color)
function getBaseTier(tier: string): string {
  return tier.split(' ')[0]
}

const UPGRADE_DATA: UpgradeLevel[] = UPGRADE_DATA_RAW.map((level, index) => ({
  ...level,
  baseTier: getBaseTier(level.tier),
  index,
}))
const UPGRADE_LEVEL_MAP = new Map(UPGRADE_DATA.map(level => [level.id, level]))

const TIER_COLOR_CLASSES: Record<string, string> = {
  Blue: 'text-sky-400',
  Gold: 'text-amber-400',
  Green: 'text-emerald-400',
  Purple: 'text-purple-500',
  Red: 'text-red-600',
}

// --- State ---

const route = useRoute()
const router = useRouter()
const { mobileScrollIntoView } = useMobileScrollIntoView()
const STORAGE_PREFIX = useRuntimeConfig().public.storagePrefix

const defaultState: CalculatorState = {
  gear: {
    coat: { from: undefined, to: undefined },
    cudgel: { from: undefined, to: undefined },
    hat: { from: undefined, to: undefined },
    pants: { from: undefined, to: undefined },
    ring: { from: undefined, to: undefined },
    watch: { from: undefined, to: undefined },
  },
  inventory: {
    designPlans: 0,
    hardenedAlloy: 0,
    lunarAmber: 0,
    polishingSolution: 0,
  },
}

const state = useLocalStorage<CalculatorState>(`${STORAGE_PREFIX}chief-gear-calculator-state`, defaultState, {
  initOnMounted: true,
  mergeDefaults: true,
})

// --- URL Parameter Sync ---

// Load state from URL on initial load
onMounted(() => {
  let needsUpdate = false
  for (const gearPiece of GEAR_PIECES) {
    const fromParameter = route.query[`${gearPiece.id}_from`] as string | undefined
    const toParameter = route.query[`${gearPiece.id}_to`] as string | undefined

    if (fromParameter && UPGRADE_LEVEL_MAP.has(fromParameter)) {
      state.value.gear[gearPiece.id].from = fromParameter
      needsUpdate = true
    }

    if (toParameter && UPGRADE_LEVEL_MAP.has(toParameter)) {
      state.value.gear[gearPiece.id].to = toParameter
      needsUpdate = true
    }
  }

  for (const material of MATERIALS) {
    const invParameter = route.query[`inv_${material.key}`] as string | undefined

    if (invParameter) {
      const amount = Number.parseInt(invParameter)

      if (!Number.isNaN(amount) && amount >= 0) {
        state.value.inventory[material.key] = amount
        needsUpdate = true
      }
    }
  }

  // If state was loaded from URL, ensure 'to' levels are valid relative to 'from'
  if (needsUpdate) {
    for (const gearPiece of GEAR_PIECES) {
      handleFromChange(gearPiece.id, state.value.gear[gearPiece.id].from, false) // Don't auto-set 'to' when loading
    }
  }
})

const queryParameters = computed(() => {
  const parameters: Record<string, string> = {}
  let hasAnyParameter = false

  for (const gearPiece of GEAR_PIECES) {
    const gearState = state.value.gear[gearPiece.id]

    if (gearState.from) {
      parameters[`${gearPiece.id}_from`] = gearState.from
      hasAnyParameter = true
    }

    if (gearState.to) {
      parameters[`${gearPiece.id}_to`] = gearState.to
      hasAnyParameter = true
    }
  }

  for (const material of MATERIALS) {
    const invAmount = state.value.inventory[material.key]

    if (invAmount > 0) {
      parameters[`inv_${material.key}`] = String(invAmount)
      hasAnyParameter = true
    }
  }

  return { hasAnyParam: hasAnyParameter, params: parameters }
})

watchDebounced(state, () => {
  router.replace({
    query: queryParameters.value.params,
  })
}, { debounce: 300, deep: true })

// --- Computed Properties ---

const selectOptions = computed(() => {
  const groupedLevels = useGroupBy(UPGRADE_DATA, level => level.baseTier)
  const baseTierOrder = ['Green', 'Blue', 'Purple', 'Gold', 'Red']

  return baseTierOrder
    .filter(baseTier => groupedLevels[baseTier])
    .map(baseTier => ({
      levels: groupedLevels[baseTier].map(level => ({ id: level.id, label: level.label })),
      tier: baseTier,
    }))
})

function calculateCost(fromId: string | undefined, toId: string | undefined): CalculatedCost {
  const result: CalculatedCost = { steps: [], total: { designPlans: 0, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 } }

  if (!fromId || !toId)
    return result

  const fromLevel = UPGRADE_LEVEL_MAP.get(fromId)
  const toLevel = UPGRADE_LEVEL_MAP.get(toId)

  if (!fromLevel || !toLevel || fromLevel.index >= toLevel.index)
    return result

  let cumulativeCost: UpgradeCost = { designPlans: 0, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }

  for (let index = fromLevel.index + 1; index <= toLevel.index; index++) {
    const currentLevel = UPGRADE_DATA[index]

    if (currentLevel) {
      cumulativeCost = {
        designPlans: cumulativeCost.designPlans + currentLevel.cost.designPlans,
        hardenedAlloy: cumulativeCost.hardenedAlloy + currentLevel.cost.hardenedAlloy,
        lunarAmber: cumulativeCost.lunarAmber + currentLevel.cost.lunarAmber,
        polishingSolution: cumulativeCost.polishingSolution + currentLevel.cost.polishingSolution,
      }
      result.steps.push({ cumulativeCost: { ...cumulativeCost }, level: currentLevel })
    }
  }

  result.total = cumulativeCost

  return result
}

function getFilteredToOptions(fromId: string | undefined) {
  if (!fromId)
    return selectOptions.value // Return all if no 'from' selected

  const fromLevel = UPGRADE_LEVEL_MAP.get(fromId)

  if (!fromLevel)
    return selectOptions.value

  const filteredGroups: LevelGroupOption[] = []
  for (const group of selectOptions.value) { // selectOptions now uses baseTier for grouping
    const filteredLevels = group.levels.filter((levelOption) => {
      const levelData = UPGRADE_LEVEL_MAP.get(levelOption.id)

      return levelData && levelData.index > fromLevel.index
    })

    if (filteredLevels.length > 0) {
      // Keep the group structure, using the baseTier (already in group.tier)
      filteredGroups.push({ levels: filteredLevels, tier: group.tier })
    }
  }

  return filteredGroups
}

const gearCosts = computed(() => {
  const costs = {} as Record<keyof CalculatorState['gear'], CalculatedCost>
  for (const gearPiece of GEAR_PIECES) {
    costs[gearPiece.id] = calculateCost(state.value.gear[gearPiece.id].from, state.value.gear[gearPiece.id].to)
  }

  return costs
})

const grandTotalCost = computed(() => {
  const total: UpgradeCost = { designPlans: 0, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }
  for (const pieceId in gearCosts.value) {
    const cost = gearCosts.value[pieceId as keyof CalculatorState['gear']].total
    total.hardenedAlloy += cost.hardenedAlloy
    total.polishingSolution += cost.polishingSolution
    total.designPlans += cost.designPlans
    total.lunarAmber += cost.lunarAmber
  }

  return total
})

const filteredGrandTotalMaterials = computed(() => MATERIALS.filter(({ key }) => grandTotalCost.value[key] > 0))

const remainingCost = computed(() => {
  const remaining: UpgradeCost = { designPlans: 0, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }
  let hasInventory = false
  for (const mat of MATERIALS) {
    const needed = grandTotalCost.value[mat.key]
    const owned = state.value.inventory[mat.key] || 0
    remaining[mat.key] = Math.max(0, needed - owned)
    if (owned > 0)
      hasInventory = true
  }

  return { hasInventory, remaining }
})

const leftoverInventory = computed(() => {
  const leftover: UpgradeCost = { designPlans: 0, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }
  for (const mat of MATERIALS) {
    const needed = grandTotalCost.value[mat.key]
    const owned = state.value.inventory[mat.key] || 0
    leftover[mat.key] = Math.max(0, owned - needed)
  }

  return leftover
})

const hasAnySelectionOrInventory = computed(() => {
  for (const pieceId in state.value.gear) {
    if (state.value.gear[pieceId as keyof CalculatorState['gear']].from || state.value.gear[pieceId as keyof CalculatorState['gear']].to) {
      return true
    }
  }
  for (const matKey in state.value.inventory) {
    if (state.value.inventory[matKey as Material] > 0) {
      return true
    }
  }

  return false
})

// --- Methods ---

function clearAll() {
  // Create a deep copy to avoid modifying the original defaultState
  state.value = structuredClone(defaultState)
  // Clear URL params as well
  router.replace({ query: {} })
}

function handleFromChange(gearId: keyof CalculatorState['gear'], newFromId: string | undefined, autoSetNext = true) {
  const currentGearState = state.value.gear[gearId]
  currentGearState.from = newFromId

  if (newFromId) {
    const fromLevel = UPGRADE_LEVEL_MAP.get(newFromId)
    const isNotLastLevel = fromLevel && fromLevel.index < UPGRADE_DATA.length - 1

    if (isNotLastLevel) {
      const nextLevel = UPGRADE_DATA[fromLevel!.index + 1] // Safe non-null assertion due to isNotLastLevel check
      const currentToLevel = currentGearState.to ? UPGRADE_LEVEL_MAP.get(currentGearState.to) : undefined
      const isToInvalid = !currentToLevel || currentToLevel.index <= fromLevel!.index // Safe non-null assertion

      if (isToInvalid) {
        currentGearState.to = autoSetNext ? nextLevel.id : undefined
      }
      else if (currentToLevel.index === fromLevel!.index) { // Safe non-null assertion
        // If 'to' is valid but now equals 'from', clear 'to'
        currentGearState.to = undefined
      }
      // If 'to' is valid and different from 'from', keep it
    }
    else {
      // If 'from' is the last level or invalid, clear 'to'
      currentGearState.to = undefined
    }
  }
  else {
    // If 'from' is cleared, clear 'to' as well
    currentGearState.to = undefined
  }
}

function handleToChange(gearId: keyof CalculatorState['gear'], newToId: string | undefined) {
  state.value.gear[gearId].to = newToId
}

/**
 * Returns a string for material costs with comma separation, omitting zero values.
 * @param materials Array of { key, label }
 * @param costRecord Record of material key to number
 * @returns string
 */
function renderMaterialCosts(
  materials: { key: Material, label: string }[],
  costRecord: Record<Material, number>,
) {
  return materials
    .filter(({ key }) => costRecord[key] > 0)
    .map(({ key, label }) => `${label}: ${formatNumber(costRecord[key])}`)
    .join(', ')
}
</script>

<template>
  <MainContentCard
    :icon="PAGE_ICON"
    :icon-color-class="PAGE_ICON_COLOR_CLASS"
    :heading="PAGE_TITLE"
    :sub-heading="PAGE_DESCRIPTION"
  >
    <CopyButton
      v-if="queryParameters.hasAnyParam"
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
      <!-- Gear Selection Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="gear in GEAR_PIECES"
          :key="gear.id"
          class="overflow-hidden"
        >
          <template #title>
            <div class="flex items-center gap-2 text-lg font-bold">
              <Icon
                :name="gear.icon"
                size="24"
                class="text-primary"
              />
              <h4>{{ gear.name }}</h4>
              <ToolTip>
                Increases {{ gear.stats }}
              </ToolTip>
            </div>
          </template>
          <template #content>
            <div
              v-auto-animate
              class="mt-4 space-y-4"
            >
              <div class="flex gap-4 max-sm:flex-col">
                <GearLevelSelect
                  :model-value="state.gear[gear.id].from"
                  :options="selectOptions"
                  label="From"
                  :tier-color-classes="TIER_COLOR_CLASSES"
                  @change="(value) => handleFromChange(gear.id, value)"
                />
                <GearLevelSelect
                  :model-value="state.gear[gear.id].to"
                  :options="getFilteredToOptions(state.gear[gear.id].from)"
                  :disabled="!state.gear[gear.id].from"
                  label="To"
                  :tier-color-classes="TIER_COLOR_CLASSES"
                  @change="(value) => handleToChange(gear.id, value)"
                />
              </div>

              <!-- Cost Display for this Gear Piece -->
              <div
                v-if="gearCosts[gear.id].total.hardenedAlloy > 0 || gearCosts[gear.id].total.polishingSolution > 0 || gearCosts[gear.id].total.designPlans > 0 || gearCosts[gear.id].total.lunarAmber > 0"
                v-auto-animate
                class="space-y-2 text-sm"
              >
                <!-- Intermediate Steps -->
                <Panel
                  v-if="gearCosts[gear.id].steps.length > 1"
                  toggleable
                  collapsed
                  :header="`Show step costs (${gearCosts[gear.id].steps.length} levels)`"
                >
                  <ol class="max-h-[25vh] list-decimal space-y-1.5 overflow-y-auto pl-6">
                    <li
                      v-for="step in gearCosts[gear.id].steps"
                      :key="step.level.id"
                    >
                      <span class="block font-bold">To {{ step.level.label }}:</span>
                      <span v-if="MATERIALS.some(({ key }) => step.level.cost[key] > 0)">
                        {{ renderMaterialCosts(MATERIALS, step.level.cost) }}
                      </span>
                    </li>
                  </ol>
                </Panel>
                <!-- Total for Piece -->
                <h5 class="font-bold">
                  Upgrade cost:
                </h5>
                <p v-if="MATERIALS.some(({ key }) => gearCosts[gear.id].total[key] > 0)">
                  {{ renderMaterialCosts(MATERIALS, gearCosts[gear.id].total) }}
                </p>
              </div>
              <div
                v-else-if="state.gear[gear.id].from && state.gear[gear.id].to"
                class="mt-4 text-sm italic text-primary"
              >
                Select valid 'From' and 'To' levels to see costs.
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Grand Total & Inventory Section -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Inventory & Remaining Cost Card -->
        <Card>
          <template #title>
            <h3 class="text-xl font-bold">
              Material inventory
            </h3>
          </template>
          <template #content>
            <div
              v-auto-animate
              class="space-y-4"
            >
              <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <IftaLabel
                  v-for="mat in MATERIALS"
                  :key="`inv-${mat.key}`"
                >
                  <InputNumber
                    v-model="state.inventory[mat.key]"
                    :min="0"
                    fluid
                    highlight-on-focus
                    input-class="tabular-nums scroll-m-1"
                    show-buttons
                    @focus="mobileScrollIntoView"
                  />
                  <label class="font-bold">{{ mat.label }}</label>
                </IftaLabel>
              </div>

              <div
                v-if="remainingCost.hasInventory && (grandTotalCost.hardenedAlloy > 0 || grandTotalCost.polishingSolution > 0 || grandTotalCost.designPlans > 0 || grandTotalCost.lunarAmber > 0)"
                class="inline-grid grid-cols-[auto,auto] gap-3"
              >
                <template
                  v-for="mat in MATERIALS"
                  :key="`rem-${mat.key}`"
                >
                  <template v-if="grandTotalCost[mat.key] > 0 || state.inventory[mat.key] > 0">
                    <span class="font-medium">{{ mat.label }}:</span>
                    <span
                      class="text-right font-bold tabular-nums"
                      :class="{
                        'text-red-500': remainingCost.remaining[mat.key] > 0,
                        'text-green-500': remainingCost.remaining[mat.key] === 0 && leftoverInventory[mat.key] >= 0,
                      }"
                    >
                      <template v-if="remainingCost.remaining[mat.key] > 0">
                        {{ formatNumber(remainingCost.remaining[mat.key]) }} needed
                      </template>
                      <template v-else-if="leftoverInventory[mat.key] > 0">
                        {{ formatNumber(leftoverInventory[mat.key]) }} left over
                      </template>
                      <template v-else>
                        Have enough
                      </template>
                    </span>
                  </template>
                </template>
              </div>
            </div>
          </template>
        </Card>

        <!-- Grand Total Cost Card -->
        <Card>
          <template #title>
            <h3 class="text-xl font-bold">
              Grand total cost
            </h3>
          </template>
          <template #content>
            <div v-auto-animate>
              <div
                v-if="filteredGrandTotalMaterials.length > 0"
                class="inline-grid grid-cols-[auto,auto] gap-3"
              >
                <template
                  v-for="material in filteredGrandTotalMaterials"
                  :key="material.key"
                >
                  <span class="font-medium">{{ material.label }}:</span>
                  <span class="text-right font-bold tabular-nums">{{ formatNumber(grandTotalCost[material.key]) }}</span>
                </template>
              </div>
              <div
                v-else
                class="italic text-primary"
              >
                Select gear levels to calculate total costs.
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="flex items-center justify-center gap-4">
        <Button
          label="Clear all"
          icon="pi pi-trash"
          severity="danger"
          outlined
          size="small"
          :disabled="!hasAnySelectionOrInventory"
          @click="clearAll"
        />
      </div>
    </div>
  </MainContentCard>
</template>
