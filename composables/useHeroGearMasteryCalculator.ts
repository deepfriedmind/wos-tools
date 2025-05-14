import type { Ref } from 'vue'

import type { CalculatedCostStep, CalculatedPieceCost, CalculatorState, GrandTotalCost, HeroGearMasteryCostPerLevel, HeroGearMasteryLevelId, RemainingCostResult } from '~/types/hero-gear-mastery'

/**
 * Returns a string for Hero Gear Mastery upgrade material costs with comma separation, omitting zero values.
 * @param materials Array of { key, label }
 * @param costs Record of material key to number
 * @returns string
 */
export function renderHeroGearMasteryUpgradeMaterialCosts(
  materials: typeof HERO_GEAR_MASTERY_MATERIALS,
  costs: HeroGearMasteryCostPerLevel,
): string {
  return materials
    .filter(material => costs[material.key] > 0)
    .map(material => `${formatNumber(costs[material.key])} ${material.label}`)
    .join(', ')
}

export default function useHeroGearMasteryCalculator(state: Ref<CalculatorState>) {
  const pieceCosts = computed<CalculatedPieceCost[]>(() => state.value.pieces.map((piece) => {
    const { steps, total } = calculateUpgradeCostForSinglePiece(piece.from, piece.to)

    return {
      id: piece.id,
      steps,
      total,
    }
  }))

  const grandTotalCost = computed<GrandTotalCost>(() => {
    const costsArray = pieceCosts.value

    return {
      essenceStone: useSumBy(costsArray, ({ total }) => total.essenceStone),
      mythicGearPiece: useSumBy(costsArray, ({ total }) => total.mythicGearPiece),
    }
  })

  const remainingCost = computed<RemainingCostResult>(() => {
    const remaining = useMapValues(grandTotalCost.value, (needed, materialKey) => {
      const owned = state.value.inventory[materialKey] || 0

      return Math.max(0, needed - owned)
    })

    const leftover = useMapValues(grandTotalCost.value, (needed, materialKey) => {
      const owned = state.value.inventory[materialKey] || 0

      return Math.max(0, owned - needed)
    })

    const hasInventory = Object.values(state.value.inventory).some(owned => owned > 0)

    return { hasInventory, leftover, remaining }
  })

  const filteredGrandTotalMaterials = computed(() => HERO_GEAR_MASTERY_MATERIALS.filter(material => grandTotalCost.value[material.key] > 0))

  return {
    filteredGrandTotalMaterials,
    grandTotalCost,
    pieceCosts,
    remainingCost,
    renderHeroGearMasteryUpgradeMaterialCosts,
  }
}

function calculateUpgradeCostForSinglePiece(
  fromLevelId: HeroGearMasteryLevelId | undefined,
  toLevelId: HeroGearMasteryLevelId | undefined,
): { steps: CalculatedCostStep[], total: HeroGearMasteryCostPerLevel } {
  const steps: CalculatedCostStep[] = []
  const total: HeroGearMasteryCostPerLevel = { essenceStone: 0, mythicGearPiece: 0 }

  // Handle empty or undefined values
  if (typeof fromLevelId !== 'string' || typeof toLevelId !== 'string') {
    return { steps, total }
  }

  const fromLevelIndex = HERO_GEAR_MASTERY_LEVELS.findIndex(l => l.id === fromLevelId)
  const toLevelIndex = HERO_GEAR_MASTERY_LEVELS.findIndex(l => l.id === toLevelId)

  if (fromLevelIndex === -1 || toLevelIndex === -1 || fromLevelIndex >= toLevelIndex) {
    return { steps, total }
  }

  for (let index = fromLevelIndex; index < toLevelIndex; index++) {
    const currentLevelToUpgrade = HERO_GEAR_MASTERY_LEVELS[index + 1] // Cost is to reach this level
    const costForLevel = HERO_GEAR_MASTERY_COST_MAP.get(currentLevelToUpgrade.id)

    if (costForLevel) {
      steps.push({ cost: { ...costForLevel }, level: currentLevelToUpgrade })
      total.essenceStone += costForLevel.essenceStone
      total.mythicGearPiece += costForLevel.mythicGearPiece
    }
  }

  return { steps, total }
}
