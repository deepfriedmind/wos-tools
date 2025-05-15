import { beforeEach, describe, expect, it, vi } from 'vitest'

import useHeroGearMasteryState from './useHeroGearMasteryState'

import type { CalculatorState, HeroGearMasteryLevelId, HeroGearMasteryQueryParameters } from '~/types/hero-gear-mastery'

// Define the return type of useHeroGearMasteryState
interface HeroGearMasteryStateReturn {
  addGearPiece: () => void
  clearAll: () => void
  filteredFromOptions: ComputedRef<{ id: string, label: string }[]>
  getFilteredToOptions: (fromLevelId?: HeroGearMasteryLevelId) => { id: string, label: string }[]
  handleFromChange: (pieceId: string, value?: HeroGearMasteryLevelId, autoSetNext?: boolean) => void
  handleToChange: (pieceId: string, value?: HeroGearMasteryLevelId) => void
  hasAnySelectionOrInventory: ComputedRef<boolean>
  loadStateFromURL: () => boolean
  queryParameters: ComputedRef<{ hasAnyParameter: boolean, params: HeroGearMasteryQueryParameters }>
  removeGearPiece: (pieceId: string) => void
  selectOptions: { id: string, label: string }[]
  state: Ref<CalculatorState>
}

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
    init: T,
    _options?: unknown,
  ) => ref(init),
)
vi.stubGlobal('nextTick', async (function_: () => void) => {
  function_()
})
vi.stubGlobal('watchDebounced', watchDebouncedMock)
vi.stubGlobal('onMounted', vi.fn())

// Mock uuid generation to make tests predictable
vi.mock('uuid', () => ({
  v4: () => 'test-uuid',
}))

// Helper function to create a component with proper typing
function createComponent(): HeroGearMasteryStateReturn {
  const component = useHeroGearMasteryState() as HeroGearMasteryStateReturn
  component.loadStateFromURL()

  return component
}

describe('useHeroGearMasteryState', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default state and one empty piece', () => {
    const component = createComponent()

    expect(component.state.value.pieces).toHaveLength(1)

    // Check each property individually, ignoring the gradient
    const [piece] = component.state.value.pieces
    expect(piece.from).toBeUndefined()
    expect(piece.id).toBe('test-uuid')
    expect(piece.to).toBeUndefined()
    expect(typeof piece.gradient).toBe('string') // Just verify it's a string

    expect(component.state.value.inventory).toEqual({
      essenceStone: 0,
      mythicGearPiece: 0,
    })
  })

  it('should add a new gear piece', () => {
    const component = createComponent()

    // Clear any existing state and ensure we start with exactly one piece
    component.state.value.pieces = [{ from: undefined, id: 'test-uuid', to: undefined }]
    expect(component.state.value.pieces).toHaveLength(1)

    component.addGearPiece()

    expect(component.state.value.pieces).toHaveLength(2)
  })

  it('should copy from/to values from the previous piece when adding a new one', () => {
    const component = createComponent()

    // Set up a piece with from/to values
    component.state.value.pieces = [{
      from: 'level-3',
      id: 'test-uuid',
      to: 'level-7',
    }]

    component.addGearPiece()

    expect(component.state.value.pieces).toHaveLength(2)
    expect(component.state.value.pieces[1].from).toBe('level-3')
    expect(component.state.value.pieces[1].to).toBe('level-7')
  })

  it('should remove a gear piece when there are multiple pieces', () => {
    const component = createComponent()

    // Set up a known state with two pieces
    component.state.value.pieces = [
      { from: undefined, id: 'piece-1', to: undefined },
      { from: undefined, id: 'piece-2', to: undefined },
    ]
    expect(component.state.value.pieces).toHaveLength(2)

    // Remove the first piece
    component.removeGearPiece('piece-1')

    // Should have one piece left, which is the second piece
    expect(component.state.value.pieces).toHaveLength(1)
    expect(component.state.value.pieces[0].id).toBe('piece-2')
  })

  it('should not allow removing all pieces (keeps at least one)', () => {
    const component = createComponent()

    // Clear any existing state and ensure we start with exactly one piece
    component.state.value.pieces = [{ from: undefined, id: 'test-uuid', to: undefined }]

    // Try to remove the only piece that exists
    const pieceId = component.state.value.pieces[0].id
    component.removeGearPiece(pieceId)

    // Should still have one piece with the same ID since we can't remove the last piece
    expect(component.state.value.pieces).toHaveLength(1)
    expect(component.state.value.pieces[0].id).toBe('test-uuid')

    // Add a second piece
    component.state.value.pieces.push({ from: undefined, id: 'second-piece', to: undefined })
    expect(component.state.value.pieces).toHaveLength(2)

    // Now we should be able to remove the first piece
    component.removeGearPiece(pieceId)
    expect(component.state.value.pieces).toHaveLength(1)
    expect(component.state.value.pieces[0].id).toBe('second-piece')

    // But we still can't remove the last remaining piece
    component.removeGearPiece('second-piece')
    expect(component.state.value.pieces).toHaveLength(1)
    expect(component.state.value.pieces[0].id).toBe('second-piece')
  })

  it('should handle from level change', () => {
    const component = createComponent()

    const pieceId = component.state.value.pieces[0].id
    component.handleFromChange(pieceId, 'level-1')

    expect(component.state.value.pieces[0].from).toBe('level-1')
  })

  it('should handle to level change', () => {
    const component = createComponent()

    const pieceId = component.state.value.pieces[0].id
    component.handleFromChange(pieceId, 'level-1')
    component.handleToChange(pieceId, 'level-5')

    expect(component.state.value.pieces[0].to).toBe('level-5')
  })

  it('should clear to level if from level is cleared', () => {
    const component = createComponent()

    const pieceId = component.state.value.pieces[0].id
    component.handleFromChange(pieceId, 'level-1')
    component.handleToChange(pieceId, 'level-5')

    // Now clear the from level
    component.handleFromChange(pieceId, undefined)

    expect(component.state.value.pieces[0].from).toBeUndefined()
    expect(component.state.value.pieces[0].to).toBeUndefined()
  })

  it('should clear all state', () => {
    const component = createComponent()

    const pieceId = component.state.value.pieces[0].id
    component.handleFromChange(pieceId, 'level-1')
    component.handleToChange(pieceId, 'level-5')
    component.state.value.inventory.essenceStone = 100

    component.clearAll()

    expect(component.state.value.pieces).toHaveLength(1)
    expect(component.state.value.pieces[0].from).toBeUndefined()
    expect(component.state.value.pieces[0].to).toBeUndefined()
    expect(component.state.value.inventory.essenceStone).toBe(0)
  })

  it('should detect when there are selections, inventory, or multiple gear pieces', () => {
    const component = createComponent()

    // Initially should be false with just one empty piece
    component.state.value.pieces = [{ from: undefined, id: 'test-uuid', to: undefined }]
    expect(component.hasAnySelectionOrInventory.value).toBe(false)

    // Add a from level
    const pieceId = component.state.value.pieces[0].id
    component.handleFromChange(pieceId, 'level-1')
    expect(component.hasAnySelectionOrInventory.value).toBe(true)

    // Clear and add inventory
    component.handleFromChange(pieceId, undefined)
    expect(component.hasAnySelectionOrInventory.value).toBe(false)

    component.state.value.inventory.essenceStone = 50
    expect(component.hasAnySelectionOrInventory.value).toBe(true)

    // Clear inventory and add a second piece
    component.state.value.inventory.essenceStone = 0
    expect(component.hasAnySelectionOrInventory.value).toBe(false)

    component.addGearPiece()
    expect(component.state.value.pieces.length).toBe(2)
    expect(component.hasAnySelectionOrInventory.value).toBe(true)
  })

  it('should generate query parameters correctly', () => {
    const component = createComponent()

    const pieceId = component.state.value.pieces[0].id
    component.handleFromChange(pieceId, 'level-1')
    component.handleToChange(pieceId, 'level-5')
    component.state.value.inventory.essenceStone = 100

    expect(component.queryParameters.value.params).toEqual({
      inv_essenceStone: '100',
      p0_from: 'level-1',
      p0_to: 'level-5',
    })
    expect(component.queryParameters.value.hasAnyParameter).toBe(true)
  })
})
