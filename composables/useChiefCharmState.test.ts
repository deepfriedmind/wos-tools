import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

import useChiefCharmState from './useChiefCharmState'

// --- Mocks for Nuxt composables and global constants ---

vi.mock('#app', () => ({
  useRuntimeConfig: () => ({
    public: { storagePrefix: 'test-' },
  }),
}))

const mockRoute = ref({ query: {} })
const mockRouter = {
  replace: vi.fn().mockResolvedValue(undefined),
}

vi.mock('#imports', () => ({
  useInitial: (array: unknown[]): unknown[] => array.slice(0, -1),
  useIsEqual: (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b),
  useLocalStorage: vi.fn((key: string, defaultValue: unknown) => ref(structuredClone(defaultValue))),
  useRoute: () => mockRoute.value,
  useRouter: () => mockRouter,
  useToMerged: (a: Record<string, unknown>, b: Record<string, unknown>) => ({ ...b, ...a }),
  watchDebounced: (source: { value: unknown }, callback: (value: unknown) => void) => callback(source.value),
}))

// Mock onMounted to be a no-op function
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')

  return {
    ...(actual as Record<string, unknown>),
    onMounted: vi.fn(),
  }
})

// --- Global constants and helpers ---

const GEAR_PIECES = [
  { id: 'coat' },
  { id: 'cudgel' },
]
const CHARM_SLOTS_PER_GEAR = 2
const CHARM_MATERIALS = [
  { key: 'charmDesign' },
  { key: 'charmGuide' },
  { key: 'charmSecret' },
]

const CHARM_UPGRADE_DATA = Array.from({ length: 16 }, (_, index) => ({
  id: `level_${index + 1}`,
  index,
  level: index + 1,
}))

const CHARM_UPGRADE_LEVEL_MAP = new Map(
  CHARM_UPGRADE_DATA.map(level => [level.id, level]),
)

vi.stubGlobal('GEAR_PIECES', GEAR_PIECES)
vi.stubGlobal('CHARM_SLOTS_PER_GEAR', CHARM_SLOTS_PER_GEAR)
vi.stubGlobal('CHARM_MATERIALS', CHARM_MATERIALS)
vi.stubGlobal('CHARM_UPGRADE_DATA', CHARM_UPGRADE_DATA)
vi.stubGlobal('CHARM_UPGRADE_LEVEL_MAP', CHARM_UPGRADE_LEVEL_MAP)

// --- Test suite ---

describe('useChiefCharmState', () => {
  beforeEach(() => {
    mockRoute.value = { query: {} }
    mockRouter.replace.mockClear()
  })

  it('initializes state with defaults', () => {
    const { loadStateFromURL, state } = useChiefCharmState()
    loadStateFromURL()
    expect(state.value.gear.coat).toBeDefined()
    expect(state.value.gear.cudgel).toBeDefined()
    expect(state.value.inventory.charmDesign).toBe(0)
    expect(state.value.inventory.charmGuide).toBe(0)
    expect(state.value.inventory.charmSecret).toBe(0)
  })

  it('clearAll resets state', () => {
    const { clearAll, loadStateFromURL, state } = useChiefCharmState()
    loadStateFromURL()
    state.value.gear.coat[0].from = 'lv1'
    state.value.inventory.charmDesign = 5
    clearAll()
    expect(state.value.gear.coat[0].from).toBeUndefined()
    expect(state.value.inventory.charmDesign).toBe(0)
  })

  it('filteredFromOptions omits last level', () => {
    const { filteredFromOptions, loadStateFromURL } = useChiefCharmState()
    loadStateFromURL()
    expect(filteredFromOptions.value.map(o => o.id)).toEqual(
      CHARM_UPGRADE_DATA.slice(0, -1).map(l => l.id),
    )
  })

  it('getFilteredToOptions returns correct options', () => {
    const { getFilteredToOptions, loadStateFromURL } = useChiefCharmState()
    loadStateFromURL()
    // No fromId: returns all
    expect(getFilteredToOptions(undefined).map(o => o.id)).toEqual(
      CHARM_UPGRADE_DATA.map(l => l.id),
    )
    // fromId = level_1: returns level_2 ... level_16
    expect(getFilteredToOptions('level_1').map(o => o.id)).toEqual(
      CHARM_UPGRADE_DATA.slice(1).map(l => l.id),
    )
    // fromId = level_15: returns level_16
    expect(getFilteredToOptions('level_15').map(o => o.id)).toEqual(['level_16'])
    // fromId = level_16: returns []
    expect(getFilteredToOptions('level_16').map(o => o.id)).toEqual([])
  })

  it('handleFromChange sets from and adjusts to', () => {
    const { handleFromChange, loadStateFromURL, state } = useChiefCharmState()
    loadStateFromURL()
    handleFromChange('coat', 0, 'level_1')
    expect(state.value.gear.coat[0].from).toBe('level_1')
    expect(state.value.gear.coat[0].to).toBe('level_2')
    // Setting to last level clears to
    handleFromChange('coat', 0, 'level_16')
    expect(state.value.gear.coat[0].from).toBe('level_16')
    expect(state.value.gear.coat[0].to).toBeUndefined()
    // Clearing from clears to
    handleFromChange('coat', 0, undefined)
    expect(state.value.gear.coat[0].from).toBeUndefined()
    expect(state.value.gear.coat[0].to).toBeUndefined()
  })

  it('handleToChange sets to', () => {
    const { handleToChange, loadStateFromURL, state } = useChiefCharmState()
    loadStateFromURL()
    handleToChange('cudgel', 1, 'lv2')
    expect(state.value.gear.cudgel[1].to).toBe('lv2')
  })

  it('hasAnySelectionOrInventory is true when any slot or inventory is set', () => {
    const { clearAll, hasAnySelectionOrInventory, loadStateFromURL, state } = useChiefCharmState()
    loadStateFromURL()
    clearAll()
    expect(hasAnySelectionOrInventory.value).toBe(false)
    state.value.gear.coat[0].from = 'level_1'
    expect(hasAnySelectionOrInventory.value).toBe(true)
    state.value.gear.coat[0].from = undefined
    state.value.inventory.charmGuide = 2
    expect(hasAnySelectionOrInventory.value).toBe(true)
  })

  it('queryParameters reflects state', () => {
    const { loadStateFromURL, queryParameters, state } = useChiefCharmState()
    loadStateFromURL()
    state.value.gear.coat[0].from = 'lv1'
    state.value.gear.coat[0].to = 'lv2'
    state.value.inventory.charmDesign = 3
    const qp = queryParameters.value
    expect(qp.hasAnyParameter).toBe(true)
    expect(qp.parameters).toMatchObject({
      coat_0_from: 'lv1',
      coat_0_to: 'lv2',
      inv_charmDesign: '3',
    })
  })

  it('selectOptions returns all upgrade levels', () => {
    const { loadStateFromURL, selectOptions } = useChiefCharmState()
    loadStateFromURL()
    expect(selectOptions.map(o => o.id)).toEqual(
      CHARM_UPGRADE_DATA.map(l => l.id),
    )
  })
})
