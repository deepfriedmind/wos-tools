import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Ref } from 'vue'
import { ref } from 'vue'

import useChiefCharmCalculator, { renderChiefCharmUpgradeMaterialCosts } from './useChiefCharmCalculator'

import type { CharmCalculatorState, CharmMaterialKey, CharmSelection } from '~/types/chief-charm'

const GEAR_PIECES = [
  { id: 'coat' },
  { id: 'cudgel' },
  { id: 'hat' },
  { id: 'pants' },
  { id: 'ring' },
  { id: 'watch' },
]
const CHARM_SLOTS_PER_GEAR = 2
const CHARM_MATERIALS: { key: CharmMaterialKey, label: string }[] = [
  { key: 'charmDesign', label: 'Design' },
  { key: 'charmGuide', label: 'Guide' },
  { key: 'charmSecret', label: 'Secret' },
]

const CHARM_UPGRADE_DATA = [
  { cost: { charmDesign: 1, charmGuide: 2, charmSecret: 3 }, id: 'level_1', index: 0, level: 1 },
  { cost: { charmDesign: 2, charmGuide: 3, charmSecret: 4 }, id: 'level_2', index: 1, level: 2 },
  { cost: { charmDesign: 3, charmGuide: 4, charmSecret: 5 }, id: 'level_3', index: 2, level: 3 },
  { cost: { charmDesign: 4, charmGuide: 5, charmSecret: 6 }, id: 'level_4', index: 3, level: 4 },
]

const CHARM_UPGRADE_LEVEL_MAP = new Map(
  CHARM_UPGRADE_DATA.map(level => [level.id, level]),
)

vi.stubGlobal('GEAR_PIECES', GEAR_PIECES)
vi.stubGlobal('CHARM_SLOTS_PER_GEAR', CHARM_SLOTS_PER_GEAR)
vi.stubGlobal('CHARM_MATERIALS', CHARM_MATERIALS)
vi.stubGlobal('CHARM_UPGRADE_DATA', CHARM_UPGRADE_DATA)
vi.stubGlobal('CHARM_UPGRADE_LEVEL_MAP', CHARM_UPGRADE_LEVEL_MAP)

describe('renderChiefCharmUpgradeMaterialCosts', () => {
  it('renders costs with non-zero values', () => {
    const result = renderChiefCharmUpgradeMaterialCosts(
      CHARM_MATERIALS,
      { charmDesign: 10, charmGuide: 0, charmSecret: 5 },
    )

    expect(result).toBe('Design: 10, Secret: 5')
  })

  it('returns empty string if all values are zero', () => {
    const result = renderChiefCharmUpgradeMaterialCosts(
      CHARM_MATERIALS,
      { charmDesign: 0, charmGuide: 0, charmSecret: 0 },
    )

    expect(result).toBe('')
  })

  it('returns empty string for empty materials array', () => {
    const result = renderChiefCharmUpgradeMaterialCosts(
      [],
      { charmDesign: 10, charmGuide: 5, charmSecret: 3 },
    )

    expect(result).toBe('')
  })

  it('handles missing keys in costRecord gracefully', () => {
    const result = renderChiefCharmUpgradeMaterialCosts(
      CHARM_MATERIALS,
      { charmDesign: 10 } as Record<CharmMaterialKey, number>,
    )

    expect(result).toBe('Design: 10')
  })
})

describe('useChiefCharmCalculator', () => {
  let state: Ref<CharmCalculatorState>
  beforeEach(() => {
    state = ref({
      gear: {
        coat: {
          0: { from: 'level_1', to: 'level_3' } as CharmSelection,
          1: { from: undefined, to: undefined } as CharmSelection,
        },
        cudgel: {
          0: { from: undefined, to: undefined } as CharmSelection,
          1: { from: undefined, to: undefined } as CharmSelection,
        },
        hat: {
          0: { from: undefined, to: undefined } as CharmSelection,
          1: { from: undefined, to: undefined } as CharmSelection,
        },
        pants: {
          0: { from: undefined, to: undefined } as CharmSelection,
          1: { from: undefined, to: undefined } as CharmSelection,
        },
        ring: {
          0: { from: undefined, to: undefined } as CharmSelection,
          1: { from: undefined, to: undefined } as CharmSelection,
        },
        watch: {
          0: { from: undefined, to: undefined } as CharmSelection,
          1: { from: undefined, to: undefined } as CharmSelection,
        },
      },
      inventory: {
        charmDesign: 2,
        charmGuide: 1,
        charmSecret: 0,
      },
    }) as Ref<CharmCalculatorState>
  })

  it('computes gearCosts and grandTotalCost correctly', () => {
    const { gearCosts, grandTotalCost } = useChiefCharmCalculator(state)
    // Only coat[0] has a range, so its slot cost is as expected
    expect(gearCosts.value.coat.slotCosts[0].steps.length).toBe(2)
    expect(gearCosts.value.coat.slotCosts[0].total).toEqual({ charmDesign: 55, charmGuide: 100, charmSecret: 0 })
    // Grand total sums all gear pieces, most are zero except coat[0]
    expect(grandTotalCost.value).toEqual({ charmDesign: 55, charmGuide: 100, charmSecret: 0 })
  })

  it('grandTotalCost correctly sums all gear costs', () => {
    // Set up multiple slots and gear pieces with upgrades
    state.value.gear.coat[1] = { from: 'level_1', to: 'level_2' }
    state.value.gear.hat[0] = { from: 'level_2', to: 'level_3' }

    const { gearCosts, grandTotalCost } = useChiefCharmCalculator(state)

    // Verify individual gear costs
    const coatTotal = gearCosts.value.coat.total
    const hatTotal = gearCosts.value.hat.total

    // Verify grand total is the sum of all gear totals
    expect(grandTotalCost.value.charmDesign).toBe(coatTotal.charmDesign + hatTotal.charmDesign)
    expect(grandTotalCost.value.charmGuide).toBe(coatTotal.charmGuide + hatTotal.charmGuide)
    expect(grandTotalCost.value.charmSecret).toBe(coatTotal.charmSecret + hatTotal.charmSecret)

    // Reset for other tests
    state.value.gear.coat[1] = { from: undefined, to: undefined }
    state.value.gear.hat[0] = { from: undefined, to: undefined }
  })

  it('correctly calculates costs with multiple slots and gear pieces', () => {
    // Set up multiple slots and gear pieces with upgrades
    state.value.gear.coat[1] = { from: 'level_1', to: 'level_2' }
    state.value.gear.hat[0] = { from: 'level_2', to: 'level_4' }

    const { gearCosts, grandTotalCost } = useChiefCharmCalculator(state)

    // Check individual slot costs based on the mock data
    expect(gearCosts.value.coat.slotCosts[0].total).toEqual({ charmDesign: 55, charmGuide: 100, charmSecret: 0 })
    expect(gearCosts.value.coat.slotCosts[1].total).toEqual({ charmDesign: 15, charmGuide: 40, charmSecret: 0 })
    expect(gearCosts.value.hat.slotCosts[0].total).toEqual({ charmDesign: 140, charmGuide: 140, charmSecret: 0 })

    // Check gear totals (sum of slots)
    expect(gearCosts.value.coat.total).toEqual({ charmDesign: 70, charmGuide: 140, charmSecret: 0 })
    expect(gearCosts.value.hat.total).toEqual({ charmDesign: 140, charmGuide: 140, charmSecret: 0 })

    // Check grand total (sum of all gear pieces)
    expect(grandTotalCost.value).toEqual({ charmDesign: 210, charmGuide: 280, charmSecret: 0 })
  })

  it('filteredGrandTotalMaterials omits zero totals', () => {
    state.value.inventory.charmDesign = 100
    state.value.inventory.charmGuide = 100
    state.value.inventory.charmSecret = 100
    const { filteredGrandTotalMaterials } = useChiefCharmCalculator(state)
    expect(filteredGrandTotalMaterials.value.map(m => m.key)).toEqual(['charmDesign', 'charmGuide'])
  })

  it('filteredGrandTotalMaterials returns empty array when all totals are zero', () => {
    // Set all gear selections to undefined to get zero costs
    state.value.gear.coat[0] = { from: undefined, to: undefined }

    const { filteredGrandTotalMaterials, grandTotalCost } = useChiefCharmCalculator(state)

    // Verify that all costs are zero
    expect(grandTotalCost.value).toEqual({ charmDesign: 0, charmGuide: 0, charmSecret: 0 })

    // Verify that filteredGrandTotalMaterials is empty
    expect(filteredGrandTotalMaterials.value).toEqual([])
  })

  it('remainingCost computes needed minus owned, never negative', () => {
    const { remainingCost } = useChiefCharmCalculator(state)
    expect(remainingCost.value).toEqual({
      charmDesign: 53,
      charmGuide: 99,
      charmSecret: 0,
    })
  })

  it('leftoverInventory computes owned minus needed, never negative', () => {
    const { leftoverInventory } = useChiefCharmCalculator(state)
    expect(leftoverInventory.value).toEqual({
      charmDesign: 0,
      charmGuide: 0,
      charmSecret: 0,
    })
    state.value.inventory.charmDesign = 10
    state.value.inventory.charmGuide = 10
    state.value.inventory.charmSecret = 10
    const { leftoverInventory: updatedLeftover } = useChiefCharmCalculator(state)
    expect(updatedLeftover.value).toEqual({
      charmDesign: 0,
      charmGuide: 0,
      charmSecret: 10,
    })
  })

  it('handles undefined inventory gracefully', () => {
    state.value.inventory = { charmDesign: 0, charmGuide: 0, charmSecret: 0 }
    const { leftoverInventory, remainingCost } = useChiefCharmCalculator(state)
    expect(remainingCost.value).toEqual({
      charmDesign: 55,
      charmGuide: 100,
      charmSecret: 0,
    })
    expect(leftoverInventory.value).toEqual({
      charmDesign: 0,
      charmGuide: 0,
      charmSecret: 0,
    })
  })

  it('returns zero costs if from or to is undefined', () => {
    state.value.gear.coat[0] = { from: undefined, to: undefined }
    const { gearCosts, grandTotalCost } = useChiefCharmCalculator(state)
    expect(gearCosts.value.coat.slotCosts[0].total).toEqual({ charmDesign: 0, charmGuide: 0, charmSecret: 0 })
    expect(grandTotalCost.value).toEqual({ charmDesign: 0, charmGuide: 0, charmSecret: 0 })
  })
})
