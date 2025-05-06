import { beforeEach, describe, expect, it } from 'vitest'
import { ref } from 'vue'

import useFireCrystalBuildingCalculator from './useFireCrystalBuildingCalculator'

import type { CalculatorState, UpgradeLevel } from '~/types/fire-crystal-building'
import { BuildingType } from '~/types/fire-crystal-building'

describe('useFireCrystalBuildingCalculator', () => {
  // Mock state
  const state = ref<CalculatorState>({
    buildings: {
      commandCenter: { from: undefined, to: undefined },
      embassy: { from: undefined, to: undefined },
      furnace: { from: 'fc1_0', to: 'fc2_0' },
      infantryCamp: { from: undefined, to: undefined },
      infirmary: { from: undefined, to: undefined },
      lancerCamp: { from: undefined, to: undefined },
      marksmanCamp: { from: undefined, to: undefined },
      warAcademy: { from: undefined, to: undefined },
    },
    inventory: {
      coal: 10_000_000,
      fireCrystal: 200,
      iron: 2_000_000,
      meat: 50_000_000,
      refinedFireCrystal: 0,
      wood: 100_000_000,
    },
    setAll: { from: undefined, to: undefined },
  })

  // Mock upgrade data
  const mockUpgradeData: Record<string, UpgradeLevel[]> = {
    [BuildingType.FURNACE]: [
      {
        cost: { coal: 0, fireCrystal: 0, iron: 0, meat: 0, refinedFireCrystal: 0, wood: 0 },
        id: 'fc1_0',
        label: 'FC 1',
        tier: 'FC 1',
      },
      {
        cost: { coal: 14_000_000, fireCrystal: 158, iron: 3_600_000, meat: 72_000_000, refinedFireCrystal: 0, wood: 72_000_000 },
        id: 'fc1_1',
        label: 'FC 1-1',
        tier: 'FC 1',
      },
      {
        cost: { coal: 14_000_000, fireCrystal: 158, iron: 3_600_000, meat: 72_000_000, refinedFireCrystal: 0, wood: 72_000_000 },
        id: 'fc2_0',
        label: 'FC 2',
        tier: 'FC 2',
      },
    ],
  }

  // Mock upgrade level map
  const mockUpgradeLevelMap: Record<string, Map<string, UpgradeLevel>> = {
    [BuildingType.FURNACE]: new Map(
      mockUpgradeData[BuildingType.FURNACE].map(level => [level.id, level]),
    ),
  }

  // Initialize calculator
  let calculator: ReturnType<typeof useFireCrystalBuildingCalculator>

  beforeEach(() => {
    state.value = {
      buildings: {
        commandCenter: { from: undefined, to: undefined },
        embassy: { from: undefined, to: undefined },
        furnace: { from: 'fc1_0', to: 'fc2_0' },
        infantryCamp: { from: undefined, to: undefined },
        infirmary: { from: undefined, to: undefined },
        lancerCamp: { from: undefined, to: undefined },
        marksmanCamp: { from: undefined, to: undefined },
        warAcademy: { from: undefined, to: undefined },
      },
      inventory: {
        coal: 10_000_000,
        fireCrystal: 200,
        iron: 2_000_000,
        meat: 50_000_000,
        refinedFireCrystal: 0,
        wood: 100_000_000,
      },
      setAll: { from: undefined, to: undefined },
    }
    calculator = useFireCrystalBuildingCalculator(state, mockUpgradeData, mockUpgradeLevelMap)
  })

  it('calculates building costs correctly', () => {
    const furnaceCost = calculator.buildingCosts.value.furnace

    // Check total cost
    expect(furnaceCost.total).toEqual({
      coal: 28_000_000,
      fireCrystal: 316,
      iron: 7_200_000,
      meat: 144_000_000,
      refinedFireCrystal: 0,
      wood: 144_000_000,
    })

    // Check steps
    expect(furnaceCost.steps).toHaveLength(2)
    expect(furnaceCost.steps[0].level.id).toBe('fc1_1')
    expect(furnaceCost.steps[1].level.id).toBe('fc2_0')
  })

  it('calculates grand total cost correctly', () => {
    expect(calculator.grandTotalCost.value).toEqual({
      coal: 28_000_000,
      fireCrystal: 316,
      iron: 7_200_000,
      meat: 144_000_000,
      refinedFireCrystal: 0,
      wood: 144_000_000,
    })
  })

  it('calculates remaining cost correctly', () => {
    expect(calculator.remainingCost.value.remaining).toEqual({
      coal: 18_000_000,
      fireCrystal: 116,
      iron: 5_200_000,
      meat: 94_000_000,
      refinedFireCrystal: 0,
      wood: 44_000_000,
    })

    expect(calculator.remainingCost.value.hasInventory).toBe(true)

    // Test with empty inventory
    state.value.inventory = {
      coal: 0,
      fireCrystal: 0,
      iron: 0,
      meat: 0,
      refinedFireCrystal: 0,
      wood: 0,
    }

    expect(calculator.remainingCost.value.hasInventory).toBe(false)
  })

  it('calculates leftover inventory correctly', () => {
    expect(calculator.leftoverInventory.value).toEqual({
      coal: 0,
      fireCrystal: 0,
      iron: 0,
      meat: 0,
      refinedFireCrystal: 0,
      wood: 0,
    })

    // Update inventory to have excess
    state.value.inventory = {
      coal: 40_000_000,
      fireCrystal: 400,
      iron: 10_000_000,
      meat: 200_000_000,
      refinedFireCrystal: 10,
      wood: 200_000_000,
    }

    expect(calculator.leftoverInventory.value).toEqual({
      coal: 12_000_000,
      fireCrystal: 84,
      iron: 2_800_000,
      meat: 56_000_000,
      refinedFireCrystal: 10,
      wood: 56_000_000,
    })
  })

  it('filters grand total materials correctly', () => {
    const filteredMaterials = calculator.filteredGrandTotalMaterials.value
    expect(filteredMaterials.length).toBe(5)
    expect(filteredMaterials.map(m => m.key)).toContain('wood')
    expect(filteredMaterials.map(m => m.key)).toContain('meat')
    expect(filteredMaterials.map(m => m.key)).toContain('coal')
    expect(filteredMaterials.map(m => m.key)).toContain('iron')
    expect(filteredMaterials.map(m => m.key)).toContain('fireCrystal')
    expect(filteredMaterials.map(m => m.key)).not.toContain('refinedFireCrystal')

    // Update state to include refined fire crystal
    state.value.buildings.furnace = { from: 'fc1_0', to: 'fc2_0' }
    mockUpgradeData[BuildingType.FURNACE][2].cost.refinedFireCrystal = 10

    expect(calculator.filteredGrandTotalMaterials.value.map(m => m.key)).toContain('refinedFireCrystal')
  })
})
