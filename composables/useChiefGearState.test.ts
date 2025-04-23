import { beforeEach, describe, expect, it, vi } from 'vitest'

import useChiefGearState from './useChiefGearState'

// --- Mocks for Nuxt composables and helpers ---
const pushMock = vi.fn()
const replaceMock = vi.fn()
const watchDebouncedMock = vi.fn(
  <T>(source: { value: T }, callback: (value: T) => void) => callback(source.value),
)

vi.stubGlobal('useRoute', (): { query: Record<string, unknown> } => ({
  query: {},
}))
vi.stubGlobal('useRouter', () => ({
  push: pushMock,
  replace: replaceMock,
}))
vi.stubGlobal('useRuntimeConfig', () => ({
  public: { storagePrefix: 'test-' },
}))
vi.stubGlobal(
  'useLocalStorage',
  <T>(
    _key: string,
    init: () => T,
    _options?: unknown,
  ) => {
    const value = ref(init())

    return value
  },
)
vi.stubGlobal('onMounted', (function_: () => void) => function_())
vi.stubGlobal('watchDebounced', watchDebouncedMock)
vi.stubGlobal(
  'useGroupBy',
  <T, K extends number | string | symbol>(
    array: T[],
    function_: (item: T) => K,
  ): Record<K, T[]> => {
    const result = {} as Record<K, T[]>
    for (const item of array) {
      const key = function_(item)

      if (!Object.hasOwn(result, key))
        result[key] = []
      result[key].push(item)
    }

    return result
  },
)

// --- Mocks for constants ---
vi.mock('~/constants/chief-gear', () => ({
  GEAR_PIECES: [
    { id: 'coat' },
    { id: 'cudgel' },
  ],
  MATERIALS: [
    { key: 'designPlans' },
    { key: 'hardenedAlloy' },
  ],
  UPGRADE_DATA: [
    { baseTier: 'Green', id: 'lv1', label: 'Level 1' },
    { baseTier: 'Blue', id: 'lv2', label: 'Level 2' },
    { baseTier: 'Purple', id: 'lv3', label: 'Level 3' },
  ],
  UPGRADE_LEVEL_MAP: new Map([
    ['lv1', { index: 0 }],
    ['lv2', { index: 1 }],
    ['lv3', { index: 2 }],
  ]),
}))

describe('useChiefGearState', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with default state', () => {
    const stateApi = useChiefGearState()
    expect(stateApi.state.value.gear.coat.from).toBeUndefined()
    expect(stateApi.state.value.gear.cudgel.to).toBeUndefined()
    expect(stateApi.state.value.inventory.designPlans).toBe(0)
  })

  it('clearAll resets state', () => {
    const stateApi = useChiefGearState()
    stateApi.state.value.gear.coat.from = 'lv1'
    stateApi.state.value.inventory.designPlans = 5
    stateApi.clearAll()
    expect(stateApi.state.value.gear.coat.from).toBeUndefined()
    expect(stateApi.state.value.inventory.designPlans).toBe(0)
  })

  it('handleFromChange sets from and updates to correctly', () => {
    const stateApi = useChiefGearState()
    stateApi.handleFromChange('coat', 'lv1')
    expect(stateApi.state.value.gear.coat.from).toBe('lv1')
    expect(stateApi.state.value.gear.coat.to).toBe('lv2')
    // Setting to last level clears 'to'
    stateApi.handleFromChange('coat', 'lv3')
    expect(stateApi.state.value.gear.coat.to).toBeUndefined()
    // Clearing from clears 'to'
    stateApi.handleFromChange('coat', undefined)
    expect(stateApi.state.value.gear.coat.to).toBeUndefined()
  })

  it('handleToChange sets to', () => {
    const stateApi = useChiefGearState()
    stateApi.handleToChange('coat', 'lv2')
    expect(stateApi.state.value.gear.coat.to).toBe('lv2')
    stateApi.handleToChange('coat', undefined)
    expect(stateApi.state.value.gear.coat.to).toBeUndefined()
  })

  it('getFilteredToOptions returns correct options', () => {
    const stateApi = useChiefGearState()
    // No from selected: returns all
    let options = stateApi.getFilteredToOptions(undefined)
    expect(options.length).toBe(3)
    // From lv1: returns lv2 and lv3
    options = stateApi.getFilteredToOptions('lv1')
    expect(options.flatMap(g => g.levels.map(l => l.id))).toContain('lv2')
    expect(options.flatMap(g => g.levels.map(l => l.id))).toContain('lv3')
    expect(options.flatMap(g => g.levels.map(l => l.id))).not.toContain('lv1')
    // From lv3: returns empty
    options = stateApi.getFilteredToOptions('lv3')
    expect(options.flatMap(g => g.levels).length).toBe(0)
  })

  it('hasAnySelectionOrInventory is true when gear or inventory set', () => {
    const stateApi = useChiefGearState()
    expect(stateApi.hasAnySelectionOrInventory.value).toBe(false)
    stateApi.state.value.gear.coat.from = 'lv1'
    expect(stateApi.hasAnySelectionOrInventory.value).toBe(true)
    stateApi.clearAll()
    stateApi.state.value.inventory.designPlans = 2
    expect(stateApi.hasAnySelectionOrInventory.value).toBe(true)
  })

  it('queryParameters reflects state', () => {
    const stateApi = useChiefGearState()
    stateApi.state.value.gear.coat.from = 'lv1'
    stateApi.state.value.gear.cudgel.to = 'lv2'
    stateApi.state.value.inventory.designPlans = 3
    const qp = stateApi.queryParameters.value
    expect(qp.hasAnyParameter).toBe(true)
    expect(qp.parameters.coat_from).toBe('lv1')
    expect(qp.parameters.cudgel_to).toBe('lv2')
    expect(qp.parameters.inv_designPlans).toBe('3')
  })
})
