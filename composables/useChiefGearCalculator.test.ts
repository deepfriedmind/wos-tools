import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Ref } from 'vue'

import useChiefGearCalculator, { renderMaterialCosts } from './useChiefGearCalculator'

import type { CalculatorState, Material, UpgradeCost } from '~/types/chief-gear'

// Mocks for dependencies/constants
vi.mock('~/constants/chief-gear', () => ({
  GEAR_PIECES: [
    { id: 'helmet' },
    { id: 'armor' },
  ],
  MATERIALS: [
    { key: 'designPlans' },
    { key: 'hardenedAlloy' },
    { key: 'lunarAmber' },
    { key: 'polishingSolution' },
  ],
  UPGRADE_DATA: [
    null,
    { cost: { designPlans: 1, hardenedAlloy: 2, lunarAmber: 3, polishingSolution: 4 } },
    { cost: { designPlans: 2, hardenedAlloy: 3, lunarAmber: 4, polishingSolution: 5 } },
  ],
  UPGRADE_LEVEL_MAP: new Map([
    ['lv1', { index: 0 }],
    ['lv2', { index: 1 }],
    ['lv3', { index: 2 }],
  ]),
}))

vi.stubGlobal('useZipObject', (keys: string[], values: unknown[]) => {
  const object: Record<string, unknown> = {}
  for (const [index, k] of keys.entries()) {
    object[k] = values[index]
  }

  return object
})

vi.stubGlobal('useSumBy', (array: unknown[], function_: (item: unknown) => number): number =>
  array.reduce<number>((sum: number, item: unknown) => sum + function_(item), 0))

function makeState(
  gear: Record<string, { from: string, to: string }>,
  inventory: Partial<UpgradeCost> = {},
): Ref<CalculatorState> {
  return ref({
    gear,
    inventory,
  }) as Ref<CalculatorState>
}

describe('useChiefGearCalculator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns zero costs if gear from/to is empty', () => {
    const state = makeState({
      armor: { from: '', to: '' },
      helmet: { from: '', to: '' },
    })
    const calc = useChiefGearCalculator(state)
    expect(calc.grandTotalCost.value).toEqual({
      designPlans: 0,
      hardenedAlloy: 0,
      lunarAmber: 0,
      polishingSolution: 0,
    })
    expect(calc.filteredGrandTotalMaterials.value).toEqual([])
    expect(calc.remainingCost.value).toEqual({
      hasInventory: false,
      remaining: {
        designPlans: 0,
        hardenedAlloy: 0,
        lunarAmber: 0,
        polishingSolution: 0,
      },
    })
    expect(calc.leftoverInventory.value).toEqual({
      designPlans: 0,
      hardenedAlloy: 0,
      lunarAmber: 0,
      polishingSolution: 0,
    })
  })

  it('calculates correct costs for upgrades', () => {
    const state = makeState({
      armor: { from: 'lv1', to: 'lv3' },
      helmet: { from: 'lv1', to: 'lv2' },
    })
    const calc = useChiefGearCalculator(state)
    // helmet: lv1->lv2 = UPGRADE_DATA[1]
    // armor: lv1->lv3 = UPGRADE_DATA[1] + UPGRADE_DATA[2]
    expect(calc.gearCosts.value).toEqual({
      armor: {
        steps: [
          {
            cumulativeCost: {
              designPlans: 1,
              hardenedAlloy: 2,
              lunarAmber: 3,
              polishingSolution: 4,
            },
            level: {
              cost: {
                designPlans: 1,
                hardenedAlloy: 2,
                lunarAmber: 3,
                polishingSolution: 4,
              },
            },
          },
          {
            cumulativeCost: {
              designPlans: 3,
              hardenedAlloy: 5,
              lunarAmber: 7,
              polishingSolution: 9,
            },
            level: {
              cost: {
                designPlans: 2,
                hardenedAlloy: 3,
                lunarAmber: 4,
                polishingSolution: 5,
              },
            },
          },
        ],
        total: {
          designPlans: 3,
          hardenedAlloy: 5,
          lunarAmber: 7,
          polishingSolution: 9,
        },
      },
      helmet: {
        steps: [
          {
            cumulativeCost: {
              designPlans: 1,
              hardenedAlloy: 2,
              lunarAmber: 3,
              polishingSolution: 4,
            },
            level: {
              cost: {
                designPlans: 1,
                hardenedAlloy: 2,
                lunarAmber: 3,
                polishingSolution: 4,
              },
            },
          },
        ],
        total: {
          designPlans: 1,
          hardenedAlloy: 2,
          lunarAmber: 3,
          polishingSolution: 4,
        },
      },
    })
    expect(calc.grandTotalCost.value).toEqual({
      designPlans: 4,
      hardenedAlloy: 7,
      lunarAmber: 10,
      polishingSolution: 13,
    })
    expect(calc.filteredGrandTotalMaterials.value).toEqual([
      { key: 'designPlans' },
      { key: 'hardenedAlloy' },
      { key: 'lunarAmber' },
      { key: 'polishingSolution' },
    ])
  })

  it('calculates remainingCost and leftoverInventory with inventory', () => {
    const state = makeState(
      {
        armor: { from: 'lv1', to: 'lv2' },
        helmet: { from: 'lv1', to: 'lv2' },
      },
      {
        designPlans: 2,
        hardenedAlloy: 1,
        lunarAmber: 10,
        polishingSolution: 0,
      },
    )
    const calc = useChiefGearCalculator(state)
    // helmet: 1, armor: 1 => total: 2 for each
    expect(calc.grandTotalCost.value).toEqual({
      designPlans: 2,
      hardenedAlloy: 4,
      lunarAmber: 6,
      polishingSolution: 8,
    })
    expect(calc.remainingCost.value).toEqual({
      hasInventory: true,
      remaining: {
        designPlans: 0,
        hardenedAlloy: 3,
        lunarAmber: 0,
        polishingSolution: 8,
      },
    })
    expect(calc.leftoverInventory.value).toEqual({
      designPlans: 0,
      hardenedAlloy: 0,
      lunarAmber: 4,
      polishingSolution: 0,
    })
  })

  it('handles missing inventory keys as zero', () => {
    const state = makeState(
      {
        armor: { from: 'lv1', to: 'lv2' },
        helmet: { from: 'lv1', to: 'lv2' },
      },
      {
        designPlans: 1,
      },
    )
    const calc = useChiefGearCalculator(state)
    expect(calc.remainingCost.value.remaining.hardenedAlloy).toBe(4)
    expect(calc.leftoverInventory.value.hardenedAlloy).toBe(0)
  })

  it('returns empty filteredGrandTotalMaterials if all costs are zero', () => {
    const state = makeState({
      armor: { from: '', to: '' },
      helmet: { from: '', to: '' },
    })
    const calc = useChiefGearCalculator(state)
    expect(calc.filteredGrandTotalMaterials.value).toEqual([])
  })

  it('filters only materials with cost > 0 in filteredGrandTotalMaterials', () => {
    const state = makeState({
      armor: { from: '', to: '' }, // cost = 0
      helmet: { from: 'lv1', to: 'lv2' }, // cost > 0
    })
    const calc = useChiefGearCalculator(state)
    // Only helmet contributes cost, so all materials > 0
    expect(calc.filteredGrandTotalMaterials.value).toEqual([
      { key: 'designPlans' },
      { key: 'hardenedAlloy' },
      { key: 'lunarAmber' },
      { key: 'polishingSolution' },
    ])
  })

  it('sets remainingCost.hasInventory correctly', () => {
    // No inventory
    const stateNoInv = makeState({
      armor: { from: 'lv1', to: 'lv2' },
      helmet: { from: 'lv1', to: 'lv2' },
    }, {})
    const calcNoInv = useChiefGearCalculator(stateNoInv)
    expect(calcNoInv.remainingCost.value.hasInventory).toBe(false)

    // Some inventory > 0
    const stateWithInv = makeState({
      armor: { from: 'lv1', to: 'lv2' },
      helmet: { from: 'lv1', to: 'lv2' },
    }, { designPlans: 1 })
    const calcWithInv = useChiefGearCalculator(stateWithInv)
    expect(calcWithInv.remainingCost.value.hasInventory).toBe(true)
  })
})

// --- renderMaterialCosts tests ---

// Mock formatNumber for deterministic output
vi.mock('~/utils/formatNumber', () => ({
  default: (value: number) => `#${value}#`,
}))

const materials = [
  { key: 'designPlans' as Material, label: 'Plans' },
  { key: 'hardenedAlloy' as Material, label: 'Alloy' },
  { key: 'lunarAmber' as Material, label: 'Amber' },
  { key: 'polishingSolution' as Material, label: 'Solution' },
]

describe('renderMaterialCosts', () => {
  it('returns formatted string for all nonzero costs', () => {
    const costRecord = {
      designPlans: 100,
      hardenedAlloy: 200,
      lunarAmber: 300,
      polishingSolution: 400,
    }

    expect(renderMaterialCosts(materials, costRecord)).toBe(
      'Plans: #100#, Alloy: #200#, Amber: #300#, Solution: #400#',
    )
  })

  it('omits materials with zero cost', () => {
    const costRecord = {
      designPlans: 0,
      hardenedAlloy: 200,
      lunarAmber: 0,
      polishingSolution: 400,
    }

    expect(renderMaterialCosts(materials, costRecord)).toBe(
      'Alloy: #200#, Solution: #400#',
    )
  })

  it('returns empty string if all costs are zero', () => {
    const costRecord = {
      designPlans: 0,
      hardenedAlloy: 0,
      lunarAmber: 0,
      polishingSolution: 0,
    }

    expect(renderMaterialCosts(materials, costRecord)).toBe('')
  })

  it('returns empty string for empty materials array', () => {
    const costRecord = {
      designPlans: 100,
      hardenedAlloy: 200,
      lunarAmber: 300,
      polishingSolution: 400,
    }

    expect(renderMaterialCosts([], costRecord)).toBe('')
  })

  it('handles missing keys in costRecord as undefined (treated as NaN > 0 is false)', () => {
    const costRecord = {
      designPlans: 100,
      // hardenedAlloy missing
      lunarAmber: 0,
      // polishingSolution missing
    } as Record<Material, number>

    expect(renderMaterialCosts(materials, costRecord)).toBe('Plans: #100#')
  })

  it('handles negative and fractional costs (only > 0 included)', () => {
    const costRecord = {
      designPlans: -5,
      hardenedAlloy: 0.5,
      lunarAmber: 0,
      polishingSolution: 2.7,
    }

    expect(renderMaterialCosts(materials, costRecord)).toBe(
      'Alloy: #0.5#, Solution: #2.7#',
    )
  })

  it('handles single material', () => {
    const singleMaterial = [{ key: 'designPlans' as Material, label: 'Plans' }]
    const costRecord = { designPlans: 123 } as Record<Material, number>
    expect(renderMaterialCosts(singleMaterial, costRecord)).toBe('Plans: #123#')
  })

  it('handles costRecord with extra keys not in materials', () => {
    const costRecord = {
      designPlans: 10,
      // extra key for test
      extra: 999,
      hardenedAlloy: 0,
      lunarAmber: 0,
      polishingSolution: 0,
    }

    expect(renderMaterialCosts(materials, costRecord)).toBe('Plans: #10#')
  })
})
