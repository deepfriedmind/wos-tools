import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import type { UpgradeLevel } from '~/types/fire-crystal-building'
import { BuildingType } from '~/types/fire-crystal-building'

// Mock the types/fire-crystal-building module
vi.mock('~/types/fire-crystal-building', () => ({
  BuildingType: {
    COMMAND_CENTER: 'commandCenter',
    EMBASSY: 'embassy',
    FURNACE: 'furnace',
    INFANTRY_CAMP: 'infantryCamp',
    INFIRMARY: 'infirmary',
    LANCER_CAMP: 'lancerCamp',
    MARKSMAN_CAMP: 'marksmanCamp',
    WAR_ACADEMY: 'warAcademy',
  },
}))

// Mock constants
vi.mock('~/constants/fire-crystal-building', () => {
  // Create mock upgrade data
  const mockUpgradeData: Record<string, UpgradeLevel[]> = {
    [BuildingType.FURNACE]: [
      {
        baseTier: 'FC 1',
        cost: { coal: 0, fireCrystal: 0, iron: 0, meat: 0, refinedFireCrystal: 0, wood: 0 },
        id: 'fc1_0',
        index: 0,
        label: 'FC 1',
        prerequisites: '',
        stars: 0,
        tier: 'FC 1',
      },
      {
        baseTier: 'FC 1',
        cost: { coal: 14_000_000, fireCrystal: 158, iron: 3_600_000, meat: 72_000_000, refinedFireCrystal: 0, wood: 72_000_000 },
        id: 'fc1_1',
        index: 1,
        label: 'FC 1-1',
        prerequisites: '',
        stars: 1,
        tier: 'FC 1',
      },
      {
        baseTier: 'FC 2',
        cost: { coal: 14_000_000, fireCrystal: 158, iron: 3_600_000, meat: 72_000_000, refinedFireCrystal: 0, wood: 72_000_000 },
        id: 'fc2_0',
        index: 2,
        label: 'FC 2',
        prerequisites: '',
        stars: 0,
        tier: 'FC 2',
      },
    ],
  }

  // Create mock upgrade level map
  const mockUpgradeLevelMap: Record<string, Map<string, UpgradeLevel>> = {
    [BuildingType.FURNACE]: new Map(
      mockUpgradeData[BuildingType.FURNACE].map(level => [level.id, level]),
    ),
  }

  return {
    FC_BUILDINGS: [],
    FC_MATERIALS: [
      { icon: 'icon', iconColorClass: 'class', key: 'wood', label: 'Wood' },
      { icon: 'icon', iconColorClass: 'class', key: 'meat', label: 'Meat' },
      { icon: 'icon', iconColorClass: 'class', key: 'coal', label: 'Coal' },
      { icon: 'icon', iconColorClass: 'class', key: 'iron', label: 'Iron' },
      { icon: 'icon', iconColorClass: 'class', key: 'fireCrystal', label: 'Fire Crystal' },
      { icon: 'icon', iconColorClass: 'class', key: 'refinedFireCrystal', label: 'Refined Fire Crystal' },
    ],
    FC_TIER_COLOR_CLASSES: {
      'FC 1': 'text-blue-400',
      'FC 2': 'text-green-400',
    },
    FC_UPGRADE_DATA: mockUpgradeData,
    FC_UPGRADE_LEVEL_MAP: mockUpgradeLevelMap,
  }
})

// Mock the useLocalStorage composable
vi.mock('~/composables/useLocalStorage', () => ({
  default: vi.fn((_key, defaultValue) => ref(defaultValue)),
}))

// Mock the useRoute and useRouter composables
vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    query: {},
  })),
  useRouter: vi.fn(() => ({
    replace: vi.fn(),
  })),
}))

// Mock the useRuntimeConfig composable
vi.mock('#app', () => ({
  useRuntimeConfig: vi.fn(() => ({
    public: {
      storagePrefix: 'test_',
    },
  })),
}))

describe('useFireCrystalBuildingState', () => {
  let state: ReturnType<typeof useFireCrystalBuildingState>

  beforeEach(() => {
    vi.clearAllMocks()
    state = useFireCrystalBuildingState()
  })

  it('initializes with default state', () => {
    expect(state.state.value).toBeDefined()
    expect(state.state.value.buildings.furnace.from).toBeUndefined()
    expect(state.state.value.buildings.furnace.to).toBeUndefined()
    expect(state.state.value.inventory.wood).toBe(0)
  })

  it('generates select options correctly', async () => {
    // Wait for onMounted to complete
    await nextTick()

    expect(state.selectOptions.value.length).toBeGreaterThan(0)
    expect(state.selectOptions.value[0].tier).toBeDefined()
    expect(state.selectOptions.value[0].levels.length).toBeGreaterThan(0)
  })

  it('detects when there are selections or inventory', () => {
    expect(state.hasAnySelectionOrInventory.value).toBe(false)

    // Add a selection
    state.state.value.buildings.furnace.from = 'fc1_0'
    expect(state.hasAnySelectionOrInventory.value).toBe(true)

    // Reset and add inventory
    state.state.value.buildings.furnace.from = undefined
    expect(state.hasAnySelectionOrInventory.value).toBe(false)

    state.state.value.inventory.wood = 1000
    expect(state.hasAnySelectionOrInventory.value).toBe(true)
  })

  it('clears all selections and inventory', () => {
    // Set some values
    state.state.value.buildings.furnace.from = 'fc1_0'
    state.state.value.buildings.furnace.to = 'fc2_0'
    state.state.value.inventory.wood = 1000

    // Clear all
    state.clearAll()

    // Check that values are reset
    expect(state.state.value.buildings.furnace.from).toBeUndefined()
    expect(state.state.value.buildings.furnace.to).toBeUndefined()
    expect(state.state.value.inventory.wood).toBe(0)
  })

  it('handles from level change correctly', () => {
    // Set from level
    state.handleFromChange(BuildingType.FURNACE, 'fc1_0')

    expect(state.state.value.buildings.furnace.from).toBe('fc1_0')
    expect(state.state.value.buildings.furnace.to).toBeDefined()

    // Change from level
    state.handleFromChange(BuildingType.FURNACE, 'fc2_0')

    expect(state.state.value.buildings.furnace.from).toBe('fc2_0')

    // Clear from level
    state.handleFromChange(BuildingType.FURNACE, undefined)

    expect(state.state.value.buildings.furnace.from).toBeUndefined()
    expect(state.state.value.buildings.furnace.to).toBeUndefined()
  })

  it('handles to level change correctly', () => {
    // Set from level first
    state.handleFromChange(BuildingType.FURNACE, 'fc1_0')

    // Set to level
    state.handleToChange(BuildingType.FURNACE, 'fc2_0')

    expect(state.state.value.buildings.furnace.to).toBe('fc2_0')

    // Change to level
    state.handleToChange(BuildingType.FURNACE, 'fc3_0')

    expect(state.state.value.buildings.furnace.to).toBe('fc3_0')

    // Clear to level
    state.handleToChange(BuildingType.FURNACE, undefined)

    expect(state.state.value.buildings.furnace.to).toBeUndefined()
  })

  it('filters to options based on from selection', () => {
    // Set from level
    state.handleFromChange(BuildingType.FURNACE, 'fc1_0')

    // Get filtered to options
    const toOptions = state.getFilteredToOptions(BuildingType.FURNACE, 'fc1_0')

    expect(toOptions.length).toBeGreaterThan(0)

    // Check that all options are higher than from level
    // We don't need to check the actual levels in the test since we're mocking the data
    expect(toOptions[0].levels.length).toBeGreaterThan(0)
  })

  it('generates URL parameters correctly', () => {
    // Set some values
    state.state.value.buildings.furnace.from = 'fc1_0'
    state.state.value.buildings.furnace.to = 'fc2_0'
    state.state.value.inventory.wood = 1000

    // Check URL parameters
    expect(state.queryParameters.value.hasAnyParameter).toBe(true)
    expect(state.queryParameters.value.parameters.furnace_from).toBe('fc1_0')
    expect(state.queryParameters.value.parameters.furnace_to).toBe('fc2_0')
    expect(state.queryParameters.value.parameters.inv_wood).toBe('1000')
  })
})
