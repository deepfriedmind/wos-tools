import type { CharmCalculatorState, CharmMaterialKey, CharmUpgradeCost } from '~/types/chief-charm'

export default function useChiefCharmCalculator(state: Ref<CharmCalculatorState>) {
  const totalCost = computed<CharmUpgradeCost>(() => {
    const cost: CharmUpgradeCost = {
      charmDesign: 0,
      charmGuide: 0,
      charmSecret: 0,
    }

    for (const gearId in state.value.gear) {
      for (let slotIndex = 0; slotIndex < CHARM_SLOTS_PER_GEAR; slotIndex++) {
        // Safely access the selection object with a type guard
        const gearPiece = state.value.gear[gearId as keyof typeof state.value.gear]

        if (gearPiece === null || gearPiece === undefined)
          continue

        const selection = gearPiece[slotIndex]

        if (selection === null || selection === undefined)
          continue

        // Skip if either from or to is missing
        if (selection.from === undefined || selection.from === ''
          || selection.to === undefined || selection.to === '') {
          continue
        }

        const fromLevel = CHARM_UPGRADE_LEVEL_MAP.get(selection.from)
        const toLevel = CHARM_UPGRADE_LEVEL_MAP.get(selection.to)

        // Skip if either level is not found in the upgrade map
        if (!fromLevel || !toLevel)
          continue

        // Only process if toLevel is higher than fromLevel
        if (toLevel.index > fromLevel.index) {
          for (let index = fromLevel.index + 1; index <= toLevel.index; index++) {
            const levelData = CHARM_UPGRADE_DATA[index]

            if (levelData === null || levelData === undefined)
              continue

            // Add costs from this level
            cost.charmDesign += levelData.cost.charmDesign
            cost.charmGuide += levelData.cost.charmGuide
            cost.charmSecret += levelData.cost.charmSecret
          }
        }
      }
    }

    return cost
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

  const hasRemainingCost = computed(() => Object.values(remainingCost.value).some(cost => cost > 0))

  return {
    hasRemainingCost,
    remainingCost,
    totalCost,
  }
}
