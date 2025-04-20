import type { Ref } from 'vue'

import type {
  CalculatedCost,
  CalculatorState,
  UpgradeCost,
} from '~/types/chief-gear'

export default function useChiefGearCalculator(state: Ref<CalculatorState>) {
  const gearCosts = computed(() => {
    const keys = GEAR_PIECES.map(gearPiece => gearPiece.id)
    const values = GEAR_PIECES.map(gearPiece =>
      calculateCost(state.value.gear[gearPiece.id].from, state.value.gear[gearPiece.id].to),
    )

    return useZipObject(keys, values)
  })

  const grandTotalCost = computed(() => {
    const costsArray = Object.values(gearCosts.value)

    return {
      designPlans: useSumBy(costsArray, ({ total }) => total.designPlans),
      hardenedAlloy: useSumBy(costsArray, ({ total }) => total.hardenedAlloy),
      lunarAmber: useSumBy(costsArray, ({ total }) => total.lunarAmber),
      polishingSolution: useSumBy(costsArray, ({ total }) => total.polishingSolution),
    }
  })

  const filteredGrandTotalMaterials = computed(() => MATERIALS.filter(({ key }) => grandTotalCost.value[key] > 0))

  const remainingCost = computed(() => {
    const remaining: UpgradeCost = { designPlans: 0, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }
    for (const mat of MATERIALS) {
      const needed = grandTotalCost.value[mat.key]
      const owned = state.value.inventory[mat.key] || 0
      remaining[mat.key] = Math.max(0, needed - owned)
    }

    const hasInventory = Object.values(state.value.inventory).some(owned => owned > 0)

    return { hasInventory, remaining }
  })

  const leftoverInventory = computed(() => {
    const keys = MATERIALS.map(mat => mat.key)
    const values = MATERIALS.map((mat) => {
      const needed = grandTotalCost.value[mat.key]
      const owned = state.value.inventory[mat.key] || 0

      return Math.max(0, owned - needed)
    })

    return useZipObject(keys, values)
  })

  return {
    filteredGrandTotalMaterials,
    gearCosts,
    grandTotalCost,
    leftoverInventory,
    remainingCost,
  }
}

function calculateCost(fromId: string | undefined, toId: string | undefined) {
  const result: CalculatedCost = { steps: [], total: { designPlans: 0, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 } }

  if (fromId == null || fromId === '' || toId == null || toId === '')
    return result

  const fromLevel = UPGRADE_LEVEL_MAP.get(fromId)
  const toLevel = UPGRADE_LEVEL_MAP.get(toId)

  if (fromLevel == null || toLevel == null || fromLevel.index >= toLevel.index)
    return result

  let cumulativeCost: UpgradeCost = { designPlans: 0, hardenedAlloy: 0, lunarAmber: 0, polishingSolution: 0 }

  for (let index = fromLevel.index + 1; index <= toLevel.index; index++) {
    const currentLevel = UPGRADE_DATA[index]

    if (currentLevel != null) {
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
