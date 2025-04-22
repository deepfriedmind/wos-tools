import type { CharmCalculatorState, CharmMaterialKey, CharmUpgradeCost } from '~/types/chief-charm'

/**
 * Returns a string for Chief Charm upgrade material costs with comma separation, omitting zero values.
 * @param materials Array of { key, label }
 * @param costRecord Record of material key to number
 * @returns string
 */
export function renderMaterialCosts(
  materials: { key: CharmMaterialKey, label: string }[],
  costRecord: Record<CharmMaterialKey, number>,
): string {
  return materials
    .filter(({ key }) => costRecord[key] > 0)
    .map(({ key, label }) => `${label}: ${formatNumber(costRecord[key])}`)
    .join(', ')
}

export default function useChiefCharmCalculator(state: Ref<CharmCalculatorState>) {
  const totalCost = computed<CharmUpgradeCost>(() => {
    const cost: CharmUpgradeCost = {
      charmDesign: 0,
      charmGuide: 0,
      charmSecret: 0,
    }
    for (const gearId of Object.keys(state.value.gear) as Array<keyof typeof state.value.gear>) {
      for (let slotIndex = 0; slotIndex < CHARM_SLOTS_PER_GEAR; slotIndex++) {
        const gearPiece = state.value.gear[gearId]

        if (gearPiece === undefined)
          continue
        const selection = gearPiece[slotIndex]

        if (
          selection === undefined
          || selection.from === undefined || selection.from === ''
          || selection.to === undefined || selection.to === ''
        ) {
          continue
        }

        const fromLevel = CHARM_UPGRADE_LEVEL_MAP.get(selection.from)
        const toLevel = CHARM_UPGRADE_LEVEL_MAP.get(selection.to)

        if (!fromLevel || !toLevel)
          continue

        if (toLevel.index > fromLevel.index) {
          for (let index = fromLevel.index + 1; index <= toLevel.index; index++) {
            const levelData = CHARM_UPGRADE_DATA[index]

            if (levelData === undefined)
              continue
            cost.charmDesign += levelData.cost.charmDesign
            cost.charmGuide += levelData.cost.charmGuide
            cost.charmSecret += levelData.cost.charmSecret
          }
        }
      }
    }

    return cost
  })

  const gearCosts = computed(() => {
    const costs: Record<string, { total: CharmUpgradeCost }> = {}
    for (const gearId of Object.keys(state.value.gear) as Array<keyof typeof state.value.gear>) {
      const total: CharmUpgradeCost = { charmDesign: 0, charmGuide: 0, charmSecret: 0 }
      for (let slotIndex = 0; slotIndex < CHARM_SLOTS_PER_GEAR; slotIndex++) {
        const selection = state.value.gear[gearId][slotIndex]

        if (
          selection === undefined
          || selection.from === undefined || selection.from === ''
          || selection.to === undefined || selection.to === ''
        ) {
          continue
        }

        const fromLevel = CHARM_UPGRADE_LEVEL_MAP.get(selection.from)
        const toLevel = CHARM_UPGRADE_LEVEL_MAP.get(selection.to)

        if (!fromLevel || !toLevel || toLevel.index <= fromLevel.index)
          continue

        for (let index = fromLevel.index + 1; index <= toLevel.index; index++) {
          const levelData = CHARM_UPGRADE_DATA[index]

          if (levelData === undefined)
            continue
          total.charmDesign += levelData.cost.charmDesign
          total.charmGuide += levelData.cost.charmGuide
          total.charmSecret += levelData.cost.charmSecret
        }
      }

      costs[gearId] = { total }
    }

    return costs
  })

  const remainingCost = computed<CharmUpgradeCost>(() => {
    const remaining: CharmUpgradeCost = {
      charmDesign: 0,
      charmGuide: 0,
      charmSecret: 0,
    }
    for (const materialKey of Object.keys(totalCost.value) as CharmMaterialKey[]) {
      const needed = totalCost.value[materialKey]
      const owned = state.value.inventory[materialKey] ?? 0
      remaining[materialKey] = Math.max(0, needed - owned)
    }

    return remaining
  })

  const leftoverInventory = computed<CharmUpgradeCost>(() => {
    const leftover: CharmUpgradeCost = { charmDesign: 0, charmGuide: 0, charmSecret: 0 }
    for (const materialKey of Object.keys(totalCost.value) as CharmMaterialKey[]) {
      const owned = state.value.inventory[materialKey] ?? 0
      const needed = totalCost.value[materialKey] ?? 0
      leftover[materialKey] = Math.max(0, owned - needed)
    }

    return leftover
  })

  const hasRemainingCost = computed(() => Object.values(remainingCost.value).some(cost => cost > 0))

  return {
    gearCosts,
    hasRemainingCost,
    leftoverInventory,
    remainingCost,
    renderMaterialCosts,
    totalCost,
  }
}
