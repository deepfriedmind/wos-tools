import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Ref } from 'vue'

import useHeroGearMasteryCalculator from './useHeroGearMasteryCalculator'

import type { CalculatorState } from '~/types/hero-gear-mastery'

// Mock formatNumber
vi.stubGlobal('formatNumber', (value: number) => value.toString())

describe('useHeroGearMasteryCalculator', () => {
  let mockState: Ref<CalculatorState>

  beforeEach(() => {
    mockState = ref({
      inventory: {
        essenceStone: 0,
        mythicGearPiece: 0,
      },
      pieces: [
        { from: undefined, id: 'piece1', to: undefined },
      ],
    })
  })

  it('should calculate costs for a single piece', () => {
    mockState.value.pieces[0].from = 'level-1'
    mockState.value.pieces[0].to = 'level-3'

    const { pieceCosts } = useHeroGearMasteryCalculator(mockState)

    expect(pieceCosts.value).toHaveLength(1)
    expect(pieceCosts.value[0].id).toBe('piece1')
    expect(pieceCosts.value[0].steps).toHaveLength(2)
    expect(pieceCosts.value[0].total).toEqual({
      essenceStone: 50, // 20 + 30
      mythicGearPiece: 0,
    })
  })

  it('should calculate grand total costs across multiple pieces', () => {
    mockState.value.pieces = [
      { from: 'level-1', id: 'piece1', to: 'level-3' },
      { from: 'level-5', id: 'piece2', to: 'level-7' },
    ]

    const { grandTotalCost } = useHeroGearMasteryCalculator(mockState)

    expect(grandTotalCost.value).toEqual({
      essenceStone: 180, // (20 + 30) + (60 + 70)
      mythicGearPiece: 0,
    })
  })

  it('should calculate remaining costs after inventory', () => {
    mockState.value.pieces = [
      { from: 'level-1', id: 'piece1', to: 'level-3' },
    ]
    mockState.value.inventory = {
      essenceStone: 30,
      mythicGearPiece: 5,
    }

    const { remainingCost } = useHeroGearMasteryCalculator(mockState)

    expect(remainingCost.value.remaining).toEqual({
      essenceStone: 20, // 50 - 30
      mythicGearPiece: 0,
    })
    expect(remainingCost.value.leftover).toEqual({
      essenceStone: 0,
      mythicGearPiece: 5, // 5 - 0
    })
    expect(remainingCost.value.hasInventory).toBe(true)
  })

  it('should handle leftover inventory correctly', () => {
    mockState.value.pieces = [
      { from: 'level-1', id: 'piece1', to: 'level-3' },
    ]
    mockState.value.inventory = {
      essenceStone: 100,
      mythicGearPiece: 5,
    }

    const { remainingCost } = useHeroGearMasteryCalculator(mockState)

    expect(remainingCost.value.remaining).toEqual({
      essenceStone: 0,
      mythicGearPiece: 0,
    })
    expect(remainingCost.value.leftover).toEqual({
      essenceStone: 50, // 100 - 50
      mythicGearPiece: 5, // 5 - 0
    })
  })

  it('should filter grand total materials correctly', () => {
    mockState.value.pieces = [
      { from: 'level-1', id: 'piece1', to: 'level-3' }, // Only essence stones
      { from: 'level-11', id: 'piece2', to: 'level-13' }, // Both materials
    ]

    const { filteredGrandTotalMaterials } = useHeroGearMasteryCalculator(mockState)

    expect(filteredGrandTotalMaterials.value).toHaveLength(2)
    expect(filteredGrandTotalMaterials.value[0].key).toBe('essenceStone')
    expect(filteredGrandTotalMaterials.value[1].key).toBe('mythicGearPiece')
  })

  it('should render material costs as a formatted string', () => {
    mockState.value.pieces = [
      { from: 'level-1', id: 'piece1', to: 'level-3' },
    ]

    const { pieceCosts, renderHeroGearMasteryUpgradeMaterialCosts } = useHeroGearMasteryCalculator(mockState)
    const costString = renderHeroGearMasteryUpgradeMaterialCosts(
      [{ icon: '', iconColorClass: '', key: 'essenceStone', label: 'Essence Stones' }],
      pieceCosts.value[0].total,
    )

    expect(costString).toBe('50 Essence Stones')
  })

  it('should handle invalid level selections', () => {
    mockState.value.pieces = [
      { from: 'level-5', id: 'piece1', to: 'level-3' }, // Invalid: from > to
      { from: 'level-999', id: 'piece2', to: 'level-1000' }, // Invalid: non-existent levels
      { from: undefined, id: 'piece3', to: 'level-5' }, // Invalid: missing from
      { from: 'level-1', id: 'piece4', to: undefined }, // Invalid: missing to
    ]

    const { pieceCosts } = useHeroGearMasteryCalculator(mockState)

    // All should have zero costs
    for (const cost of pieceCosts.value) {
      expect(cost.steps).toHaveLength(0)
      expect(cost.total).toEqual({ essenceStone: 0, mythicGearPiece: 0 })
    }
  })

  it('should handle higher level upgrades with mythic gear pieces', () => {
    mockState.value.pieces = [
      { from: 'level-10', id: 'piece1', to: 'level-15' },
    ]

    const { pieceCosts } = useHeroGearMasteryCalculator(mockState)

    expect(pieceCosts.value[0].total).toEqual({
      essenceStone: 650, // 110 + 120 + 130 + 140 + 150
      mythicGearPiece: 15, // 1 + 2 + 3 + 4 + 5
    })
  })
})
