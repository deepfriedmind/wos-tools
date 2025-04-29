import type { CharmCalculatorState, CharmMaterialKey, CharmUpgradeCost, CharmUpgradeLevel } from '~/types/chief-charm'
import type { GearPiece } from '~/types/chief-gear'

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
  const gearCosts = computed(() => {
    const costs: Record<GearPiece['id'], { slotCosts: Record<number, { steps: { cumulativeCost: CharmUpgradeCost, level: CharmUpgradeLevel }[], total: CharmUpgradeCost }>, total: CharmUpgradeCost }> = {} as Record<GearPiece['id'], { slotCosts: Record<number, { steps: { cumulativeCost: CharmUpgradeCost, level: CharmUpgradeLevel }[], total: CharmUpgradeCost }>, total: CharmUpgradeCost }>
    for (const gearId of Object.keys(state.value.gear) as GearPiece['id'][]) {
      const gearPieceData = state.value.gear[gearId]
      const slotCosts: Record<number, { steps: { cumulativeCost: CharmUpgradeCost, level: CharmUpgradeLevel }[], total: CharmUpgradeCost }> = {}
      const gearTotal: CharmUpgradeCost = { charmDesign: 0, charmGuide: 0, charmSecret: 0 }
      for (let slotIndex = 0; slotIndex < CHARM_SLOTS_PER_GEAR; slotIndex++) {
        const selection = gearPieceData[slotIndex]
        const calculatedSlotCost = calculateCharmSlotCost(selection?.from, selection?.to)
        slotCosts[slotIndex] = calculatedSlotCost
        gearTotal.charmDesign += calculatedSlotCost.total.charmDesign
        gearTotal.charmGuide += calculatedSlotCost.total.charmGuide
        gearTotal.charmSecret += calculatedSlotCost.total.charmSecret
      }

      costs[gearId] = { slotCosts, total: gearTotal }
    }

    return costs
  })

  const grandTotalCost = computed(() => {
    const total: CharmUpgradeCost = { charmDesign: 0, charmGuide: 0, charmSecret: 0 }
    for (const gearId of Object.keys(gearCosts.value) as GearPiece['id'][]) {
      const gearData = gearCosts.value[gearId]
      total.charmDesign += gearData.total.charmDesign
      total.charmGuide += gearData.total.charmGuide
      total.charmSecret += gearData.total.charmSecret
    }

    return total
  })

  const filteredGrandTotalMaterials = computed(() => CHARM_MATERIALS.filter(({ key }) => grandTotalCost.value[key] > 0))

  const remainingCost = computed(() => {
    const remaining: CharmUpgradeCost = { charmDesign: 0, charmGuide: 0, charmSecret: 0 }
    for (const materialKey of Object.keys(grandTotalCost.value) as CharmMaterialKey[]) {
      const needed = grandTotalCost.value[materialKey]
      const owned = state.value.inventory[materialKey] === undefined ? 0 : state.value.inventory[materialKey]
      remaining[materialKey] = Math.max(0, needed - owned)
    }

    return remaining
  })

  const leftoverInventory = computed(() => {
    const leftover: CharmUpgradeCost = { charmDesign: 0, charmGuide: 0, charmSecret: 0 }
    for (const materialKey of Object.keys(grandTotalCost.value) as CharmMaterialKey[]) {
      const owned = state.value.inventory[materialKey] === undefined ? 0 : state.value.inventory[materialKey]
      const needed = grandTotalCost.value[materialKey] === undefined ? 0 : grandTotalCost.value[materialKey]
      leftover[materialKey] = Math.max(0, owned - needed)
    }

    return leftover
  })

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
function calculateCharmSlotCost(fromId: string | undefined, toId: string | undefined): { steps: { cumulativeCost: CharmUpgradeCost, level: CharmUpgradeLevel }[], total: CharmUpgradeCost } {
  const result = {
    steps: [] as { cumulativeCost: CharmUpgradeCost, level: CharmUpgradeLevel }[],
    total: { charmDesign: 0, charmGuide: 0, charmSecret: 0 } as CharmUpgradeCost,
  }

  if (fromId === undefined || fromId === '' || toId === undefined || toId === '') {
    return result
  }

  const fromLevel = CHARM_UPGRADE_LEVEL_MAP.get(fromId)
  const toLevel = CHARM_UPGRADE_LEVEL_MAP.get(toId)

  if (fromLevel === undefined || toLevel === undefined || fromLevel.index >= toLevel.index) {
    return result
  }

  const cumulativeCost: CharmUpgradeCost = { charmDesign: 0, charmGuide: 0, charmSecret: 0 }
  for (let index = fromLevel.index + 1; index <= toLevel.index; index++) {
    const currentLevelData = CHARM_UPGRADE_DATA[index]

    if (currentLevelData === undefined) {
      continue
    }

    cumulativeCost.charmDesign += currentLevelData.cost.charmDesign
    cumulativeCost.charmGuide += currentLevelData.cost.charmGuide
    cumulativeCost.charmSecret += currentLevelData.cost.charmSecret
    result.steps.push({
      cumulativeCost: { ...cumulativeCost },
      level: currentLevelData,
    })
  }

  result.total = { ...cumulativeCost }

  return result
}
