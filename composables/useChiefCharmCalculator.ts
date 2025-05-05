import type { CharmCalculatorState, CharmMaterialKey, CharmUpgradeCost, CharmUpgradeLevel } from '~/types/chief-charm'

/**
 * Creates an empty charm upgrade cost object with all values set to 0
 */
const emptyCharmCost: CharmUpgradeCost = {
  charmDesign: 0,
  charmGuide: 0,
  charmSecret: 0,
}

/**
 * Returns a string for Chief Charm upgrade material costs with comma separation, omitting zero values.
 * @param materials Array of { key, label }
 * @param costRecord Record of material key to number
 * @returns string
 */
export function renderChiefCharmUpgradeMaterialCosts(
  materials: { key: CharmMaterialKey, label: string }[],
  costRecord: Record<CharmMaterialKey, number>,
): string {
  return materials
    .filter(({ key }) => costRecord[key] > 0)
    .map(({ key, label }) => `${label}: ${formatNumber(costRecord[key])}`)
    .join(', ')
}

export default function useChiefCharmCalculator(state: Ref<CharmCalculatorState>) {
  const gearCosts = computed(() =>
    Object.fromEntries(
      Object.entries(state.value.gear).map(([gearId, gearPieceData]) => {
        // Calculate costs for each slot in this gear piece
        const slotCosts = Object.fromEntries(
          useRange(0, CHARM_SLOTS_PER_GEAR).map((slotIndex) => {
            const selection = gearPieceData[slotIndex]
            const calculatedSlotCost = calculateCharmSlotCost(selection?.from, selection?.to)

            return [slotIndex, calculatedSlotCost]
          }),
        )

        // Calculate total cost for this gear piece by summing all slot costs
        const gearTotal = useMapValues(emptyCharmCost, (_, materialKey) =>
          useSumBy(Object.values(slotCosts), ({ total }) => total[materialKey])) as CharmUpgradeCost

        return [gearId, { slotCosts, total: gearTotal }]
      }),
    ),
  )

  const grandTotalCost = computed(() => {
    const costsArray = Object.values(gearCosts.value)

    return useMapValues(emptyCharmCost, (_, materialKey) =>
      useSumBy(costsArray, ({ total }) => total[materialKey])) as CharmUpgradeCost
  })

  const filteredGrandTotalMaterials = computed(() => CHARM_MATERIALS.filter(({ key }) => grandTotalCost.value[key] > 0))

  const remainingCost = computed(() =>
    useMapValues(grandTotalCost.value, (needed, materialKey) => {
      const owned = state.value.inventory[materialKey] || 0

      return Math.max(0, needed - owned)
    }),
  )

  const leftoverInventory = computed(() =>
    Object.fromEntries(
      CHARM_MATERIALS.map(({ key }) => [
        key,
        Math.max(0, (state.value.inventory[key] || 0) /* owned */ - (grandTotalCost.value[key] || 0) /* needed */),
      ]),
    ) as CharmUpgradeCost,
  )

  return {
    filteredGrandTotalMaterials,
    gearCosts,
    grandTotalCost,
    leftoverInventory,
    remainingCost,
  }
}

/**
 * Calculates the upgrade cost for a single charm slot, including intermediate steps.
 * @param fromId The starting level ID (e.g., 'level_1') or undefined.
 * @param toId The target level ID (e.g., 'level_5') or undefined.
 * @returns An object containing the steps and total cost.
 */

/**
 * Calculates the upgrade cost for a single charm slot, including intermediate steps.
 * @param fromId The starting level ID (e.g., 'level_1') or undefined.
 * @param toId The target level ID (e.g., 'level_5') or undefined.
 * @returns An object containing the steps and total cost.
 */
function calculateCharmSlotCost(fromId: string | undefined, toId: string | undefined): { steps: { cumulativeCost: CharmUpgradeCost, level: CharmUpgradeLevel }[], total: CharmUpgradeCost } {
  const result = {
    steps: [] as { cumulativeCost: CharmUpgradeCost, level: CharmUpgradeLevel }[],
    total: { ...emptyCharmCost },
  }

  if (fromId === undefined || fromId === '' || toId === undefined || toId === '') {
    return result
  }

  const fromLevel = CHARM_UPGRADE_LEVEL_MAP.get(fromId)
  const toLevel = CHARM_UPGRADE_LEVEL_MAP.get(toId)

  if (fromLevel === undefined || toLevel === undefined || fromLevel.index >= toLevel.index) {
    return result
  }

  let cumulativeCost: CharmUpgradeCost = { ...emptyCharmCost }

  for (let index = fromLevel.index + 1; index <= toLevel.index; index++) {
    const currentLevelData = CHARM_UPGRADE_DATA[index]

    if (currentLevelData === undefined) {
      continue
    }

    // Add current level costs to cumulative costs
    cumulativeCost = useMapValues(cumulativeCost, (total, materialKey) =>
      total + (currentLevelData.cost[materialKey] || 0)) as CharmUpgradeCost

    result.steps.push({
      cumulativeCost: { ...cumulativeCost },
      level: currentLevelData,
    })
  }

  result.total = { ...cumulativeCost }

  return result
}
