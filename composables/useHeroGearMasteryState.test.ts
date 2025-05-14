import { beforeEach, describe, expect, it, vi } from 'vitest'

import useHeroGearMasteryState from './useHeroGearMasteryState'

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
  ) => {
    const value = ref(init)

    return value
  },
)
vi.stubGlobal('nextTick', async (function_: () => void) => {
  function_()
})
vi.stubGlobal('watchDebounced', watchDebouncedMock)

// Mock uuid generation to make tests predictable
vi.mock('uuid', () => ({
  v4: () => 'test-uuid',
}))

describe('useHeroGearMasteryState', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default state and one empty piece', () => {
    const { state } = useHeroGearMasteryState()

    expect(state.value.pieces).toHaveLength(1)

    // Check each property individually, ignoring the gradient
    const [piece] = state.value.pieces
    expect(piece.from).toBeUndefined()
    expect(piece.id).toBe('test-uuid')
    expect(piece.to).toBeUndefined()
    expect(typeof piece.gradient).toBe('string') // Just verify it's a string

    expect(state.value.inventory).toEqual({
      essenceStone: 0,
      mythicGearPiece: 0,
    })
  })

  it('should add a new gear piece', () => {
    const { addGearPiece, state } = useHeroGearMasteryState()

    // Clear any existing state and ensure we start with exactly one piece
    state.value.pieces = [{ from: undefined, id: 'test-uuid', to: undefined }]
    expect(state.value.pieces).toHaveLength(1)

    addGearPiece()

    expect(state.value.pieces).toHaveLength(2)
  })

  it('should copy from/to values from the previous piece when adding a new one', () => {
    const { addGearPiece, state } = useHeroGearMasteryState()

    // Set up a piece with from/to values
    state.value.pieces = [{
      from: 'level-3',
      id: 'test-uuid',
      to: 'level-7',
    }]

    addGearPiece()

    expect(state.value.pieces).toHaveLength(2)
    expect(state.value.pieces[1].from).toBe('level-3')
    expect(state.value.pieces[1].to).toBe('level-7')
  })

  it('should remove a gear piece when there are multiple pieces', () => {
    const { removeGearPiece, state } = useHeroGearMasteryState()

    // Set up a known state with two pieces
    state.value.pieces = [
      { from: undefined, id: 'piece-1', to: undefined },
      { from: undefined, id: 'piece-2', to: undefined },
    ]
    expect(state.value.pieces).toHaveLength(2)

    // Remove the first piece
    removeGearPiece('piece-1')

    // Should have one piece left, which is the second piece
    expect(state.value.pieces).toHaveLength(1)
    expect(state.value.pieces[0].id).toBe('piece-2')
  })

  it('should not allow removing all pieces (keeps at least one)', () => {
    const { removeGearPiece, state } = useHeroGearMasteryState()

    // Clear any existing state and ensure we start with exactly one piece
    state.value.pieces = [{ from: undefined, id: 'test-uuid', to: undefined }]

    // Try to remove the only piece that exists
    const pieceId = state.value.pieces[0].id
    removeGearPiece(pieceId)

    // Should still have one piece with the same ID since we can't remove the last piece
    expect(state.value.pieces).toHaveLength(1)
    expect(state.value.pieces[0].id).toBe('test-uuid')

    // Add a second piece
    state.value.pieces.push({ from: undefined, id: 'second-piece', to: undefined })
    expect(state.value.pieces).toHaveLength(2)

    // Now we should be able to remove the first piece
    removeGearPiece(pieceId)
    expect(state.value.pieces).toHaveLength(1)
    expect(state.value.pieces[0].id).toBe('second-piece')

    // But we still can't remove the last remaining piece
    removeGearPiece('second-piece')
    expect(state.value.pieces).toHaveLength(1)
    expect(state.value.pieces[0].id).toBe('second-piece')
  })

  it('should handle from level change', () => {
    const { handleFromChange, state } = useHeroGearMasteryState()

    const pieceId = state.value.pieces[0].id
    handleFromChange(pieceId, 'level-1')

    expect(state.value.pieces[0].from).toBe('level-1')
  })

  it('should handle to level change', () => {
    const { handleFromChange, handleToChange, state } = useHeroGearMasteryState()

    const pieceId = state.value.pieces[0].id
    handleFromChange(pieceId, 'level-1')
    handleToChange(pieceId, 'level-5')

    expect(state.value.pieces[0].to).toBe('level-5')
  })

  it('should clear to level if from level is cleared', () => {
    const { handleFromChange, handleToChange, state } = useHeroGearMasteryState()

    const pieceId = state.value.pieces[0].id
    handleFromChange(pieceId, 'level-1')
    handleToChange(pieceId, 'level-5')

    // Now clear the from level
    handleFromChange(pieceId, undefined)

    expect(state.value.pieces[0].from).toBeUndefined()
    expect(state.value.pieces[0].to).toBeUndefined()
  })

  it('should clear all state', () => {
    const { clearAll, handleFromChange, handleToChange, state } = useHeroGearMasteryState()

    const pieceId = state.value.pieces[0].id
    handleFromChange(pieceId, 'level-1')
    handleToChange(pieceId, 'level-5')
    state.value.inventory.essenceStone = 100

    clearAll()

    expect(state.value.pieces).toHaveLength(1)
    expect(state.value.pieces[0].from).toBeUndefined()
    expect(state.value.pieces[0].to).toBeUndefined()
    expect(state.value.inventory.essenceStone).toBe(0)
  })

  it('should detect when there are selections, inventory, or multiple gear pieces', () => {
    const { addGearPiece, handleFromChange, hasAnySelectionOrInventory, state } = useHeroGearMasteryState()

    // Initially should be false with just one empty piece
    state.value.pieces = [{ from: undefined, id: 'test-uuid', to: undefined }]
    expect(hasAnySelectionOrInventory.value).toBe(false)

    // Add a from level
    const pieceId = state.value.pieces[0].id
    handleFromChange(pieceId, 'level-1')
    expect(hasAnySelectionOrInventory.value).toBe(true)

    // Clear and add inventory
    handleFromChange(pieceId, undefined)
    expect(hasAnySelectionOrInventory.value).toBe(false)

    state.value.inventory.essenceStone = 50
    expect(hasAnySelectionOrInventory.value).toBe(true)

    // Clear inventory and add a second piece
    state.value.inventory.essenceStone = 0
    expect(hasAnySelectionOrInventory.value).toBe(false)

    addGearPiece()
    expect(state.value.pieces.length).toBe(2)
    expect(hasAnySelectionOrInventory.value).toBe(true)
  })

  it('should generate query parameters correctly', () => {
    const { handleFromChange, handleToChange, queryParameters, state } = useHeroGearMasteryState()

    const pieceId = state.value.pieces[0].id
    handleFromChange(pieceId, 'level-1')
    handleToChange(pieceId, 'level-5')
    state.value.inventory.essenceStone = 100

    expect(queryParameters.value.params).toEqual({
      inv_essenceStone: '100',
      p0_from: 'level-1',
      p0_to: 'level-5',
    })
    expect(queryParameters.value.hasAnyParameter).toBe(true)
  })
})
