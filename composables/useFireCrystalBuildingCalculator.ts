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
  const buildingCosts = computed(() =>
    useMapValues(state.value.buildings, (buildingState, buildingId) =>
      calculateCost(buildingId, buildingState.from, buildingState.to)),
  )

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
    const remaining = useMapValues(grandTotalCost.value, (needed, materialKey) => {
      const owned = state.value.inventory[materialKey] || 0

      return Math.max(0, needed - owned)
    })

    const hasInventory = Object.values(state.value.inventory).some(owned => owned > 0)

    return { hasInventory, remaining }
  })

  const leftoverInventory = computed(() =>
    Object.fromEntries(
      FC_MATERIALS.map(({ key }) => [
        key,
        Math.max(0, (state.value.inventory[key] || 0) /* owned */ - grandTotalCost.value[key] /* needed */),
      ]),
    ),
  )

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
    const emptyUpgradeCost: UpgradeCost = {
      coal: 0,
      fireCrystal: 0,
      iron: 0,
      meat: 0,
      refinedFireCrystal: 0,
      wood: 0,
    }

    const result: CalculatedCost = {
      steps: [],
      total: { ...emptyUpgradeCost },
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

    // Initialize with zero values for all materials
    let cumulativeCost: UpgradeCost = { ...emptyUpgradeCost }

    for (let index = fromIndex + 1; index <= toIndex; index++) {
      const currentLevel = data[index]

      if (currentLevel != null) {
        // Add current level costs to cumulative costs
        cumulativeCost = useMapValues(cumulativeCost, (total, materialKey) =>
          total + (currentLevel.cost[materialKey] || 0)) as UpgradeCost
        result.steps.push({ cumulativeCost: { ...cumulativeCost }, level: currentLevel })
      }
    }

    result.total = cumulativeCost

    return result
  }
}
