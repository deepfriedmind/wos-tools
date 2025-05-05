import type { Ref } from 'vue'

import type {
  CalculatedCost,
  CalculatorState,
  Material,
  UpgradeCost,
  UpgradeLevel,
} from '~/types/fire-crystal-building'

/**
 * Returns a string for Fire Crystal building upgrade material costs with comma separation, omitting zero values.
 * @param materials Array of { key, label }
 * @param costRecord Record of material key to number
 * @returns string
 */
export function renderFireCrystalBuildingUpgradeMaterialCosts(
  materials: { key: Material, label: string }[],
  costRecord: Record<Material, number>,
) {
  return materials
    .filter(({ key }) => costRecord[key] > 0)
    .map(({ key, label }) => `${label}: ${formatNumber(costRecord[key], true)}`)
    .join(', ')
}

export default function useFireCrystalBuildingCalculator(
  state: Ref<CalculatorState>,
  upgradeData: Record<string, UpgradeLevel[]>,
  upgradeLevelMap: Record<string, Map<string, UpgradeLevel>>,
) {
  const buildingCosts = computed(() => {
    const keys = Object.keys(state.value.buildings) as (keyof CalculatorState['buildings'])[]
    const values = keys.map((buildingId) => {
      const buildingState = state.value.buildings[buildingId]

      return calculateCost(buildingId, buildingState.from, buildingState.to)
    })

    return useZipObject(keys, values)
  })

  const grandTotalCost = computed(() => {
    const costsArray = Object.values(buildingCosts.value)

    return {
      coal: useSumBy(costsArray, ({ total }) => total.coal),
      fireCrystal: useSumBy(costsArray, ({ total }) => total.fireCrystal),
      iron: useSumBy(costsArray, ({ total }) => total.iron),
      meat: useSumBy(costsArray, ({ total }) => total.meat),
      refinedFireCrystal: useSumBy(costsArray, ({ total }) => total.refinedFireCrystal),
      wood: useSumBy(costsArray, ({ total }) => total.wood),
    }
  })

  const filteredGrandTotalMaterials = computed(() => FC_MATERIALS.filter(({ key }) => grandTotalCost.value[key] > 0))

  const remainingCost = computed(() => {
    const { inventory } = state.value
    const total = grandTotalCost.value

    const remaining = {
      coal: Math.max(0, total.coal - inventory.coal),
      fireCrystal: Math.max(0, total.fireCrystal - inventory.fireCrystal),
      iron: Math.max(0, total.iron - inventory.iron),
      meat: Math.max(0, total.meat - inventory.meat),
      refinedFireCrystal: Math.max(0, total.refinedFireCrystal - inventory.refinedFireCrystal),
      wood: Math.max(0, total.wood - inventory.wood),
    }

    const hasInventory = Object.values(inventory).some(owned => owned > 0)

    return { hasInventory, remaining }
  })

  const leftoverInventory = computed(() => {
    const { inventory } = state.value
    const total = grandTotalCost.value

    return {
      coal: Math.max(0, inventory.coal - total.coal),
      fireCrystal: Math.max(0, inventory.fireCrystal - total.fireCrystal),
      iron: Math.max(0, inventory.iron - total.iron),
      meat: Math.max(0, inventory.meat - total.meat),
      refinedFireCrystal: Math.max(0, inventory.refinedFireCrystal - total.refinedFireCrystal),
      wood: Math.max(0, inventory.wood - total.wood),
    }
  })

  return {
    buildingCosts,
    filteredGrandTotalMaterials,
    grandTotalCost,
    leftoverInventory,
    remainingCost,
    renderFireCrystalBuildingUpgradeMaterialCosts,
  }

  function calculateCost(
    buildingType: keyof CalculatorState['buildings'],
    fromId: string | undefined,
    toId: string | undefined,
  ): CalculatedCost {
    const result: CalculatedCost = {
      steps: [],
      total: {
        coal: 0,
        fireCrystal: 0,
        iron: 0,
        meat: 0,
        refinedFireCrystal: 0,
        wood: 0,
      },
    }

    if (fromId == null || fromId === '' || toId == null || toId === '')
      return result

    // Get the appropriate upgrade level map for this building type
    const levelMap = upgradeLevelMap[buildingType]

    const fromLevel = levelMap.get(fromId)
    const toLevel = levelMap.get(toId)

    if (fromLevel == null || toLevel == null)
      return result

    // Get the data array for this building type
    const data = upgradeData[buildingType]

    const fromIndex = data.indexOf(fromLevel)
    const toIndex = data.indexOf(toLevel)

    if (fromIndex >= toIndex)
      return result

    let cumulativeCost: UpgradeCost = {
      coal: 0,
      fireCrystal: 0,
      iron: 0,
      meat: 0,
      refinedFireCrystal: 0,
      wood: 0,
    }

    for (let index = fromIndex + 1; index <= toIndex; index++) {
      const currentLevel = data[index]

      if (currentLevel != null) {
        cumulativeCost = {
          coal: cumulativeCost.coal + currentLevel.cost.coal,
          fireCrystal: cumulativeCost.fireCrystal + currentLevel.cost.fireCrystal,
          iron: cumulativeCost.iron + currentLevel.cost.iron,
          meat: cumulativeCost.meat + currentLevel.cost.meat,
          refinedFireCrystal: cumulativeCost.refinedFireCrystal + currentLevel.cost.refinedFireCrystal,
          wood: cumulativeCost.wood + currentLevel.cost.wood,
        }
        result.steps.push({ cumulativeCost: { ...cumulativeCost }, level: currentLevel })
      }
    }

    result.total = cumulativeCost

    return result
  }
}
