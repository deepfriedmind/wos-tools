import { describe, expect, it, vi } from 'vitest'
import type { Ref } from 'vue'
import { ref } from 'vue'

import useChiefCharmCalculator from './useChiefCharmCalculator'

import type { CharmCalculatorState } from '~/types/chief-charm'
import type { GearPiece } from '~/types/chief-gear' // Import GearPiece type

// Mock constants
// We only mock chief-charm here. chief-gear will be imported dynamically in createMockState.
vi.mock('~/constants/chief-charm', () => ({
  CHARM_SLOTS_PER_GEAR: 2, // Keep this simple mock
  CHARM_UPGRADE_DATA: [
    { cost: { charmDesign: 0, charmGuide: 0, charmSecret: 0 }, id: 'c0', index: 0, level: 0 },
    { cost: { charmDesign: 10, charmGuide: 0, charmSecret: 0 }, id: 'c1', index: 1, level: 1 },
    { cost: { charmDesign: 20, charmGuide: 1, charmSecret: 0 }, id: 'c2', index: 2, level: 2 },
    { cost: { charmDesign: 30, charmGuide: 2, charmSecret: 1 }, id: 'c3', index: 3, level: 3 },
  ],
  CHARM_UPGRADE_LEVEL_MAP: new Map([
    ['c0', { cost: { charmDesign: 0, charmGuide: 0, charmSecret: 0 }, id: 'c0', index: 0, level: 0 }],
    ['c1', { cost: { charmDesign: 10, charmGuide: 0, charmSecret: 0 }, id: 'c1', index: 1, level: 1 }],
    ['c2', { cost: { charmDesign: 20, charmGuide: 1, charmSecret: 0 }, id: 'c2', index: 2, level: 2 }],
    ['c3', { cost: { charmDesign: 30, charmGuide: 2, charmSecret: 1 }, id: 'c3', index: 3, level: 3 }],
  ]),
}))

// Helper to create a mock state based on actual GEAR_PIECES and mocked CHARM_SLOTS_PER_GEAR
async function createMockState(initialState?: Partial<CharmCalculatorState>): Promise<Ref<CharmCalculatorState>> {
  // Use importActual to get the *real* GEAR_PIECES within this scope
  const { GEAR_PIECES } = await vi.importActual<{ GEAR_PIECES: GearPiece[] }>('~/constants/chief-gear')
  // Use the mocked CHARM_SLOTS_PER_GEAR
  const { CHARM_SLOTS_PER_GEAR } = await vi.importActual<{ CHARM_SLOTS_PER_GEAR: number }>('~/constants/chief-charm')

  // Dynamically create default gear state based on actual GEAR_PIECES
  const defaultGearState = Object.fromEntries(
    GEAR_PIECES.map((gearPiece: GearPiece) => [ // Add type here
      gearPiece.id,
      Object.fromEntries(
        // Create array [0, 1, ..., CHARM_SLOTS_PER_GEAR - 1]
        Array.from({ length: CHARM_SLOTS_PER_GEAR }, (_, index) => index).map(slotIndex => [
          slotIndex,
          { from: undefined, to: undefined },
        ]),
      ),
    ]),
  ) as CharmCalculatorState['gear']

  const defaultInventoryState = {
    charmDesign: 0,
    charmGuide: 0,
    charmSecret: 0,
  }

  const defaultState: CharmCalculatorState = {
    gear: defaultGearState,
    inventory: defaultInventoryState,
  }

  // Merge initialState with defaultState, ensuring all gear keys are present
  const mergedGear = { ...defaultState.gear } // Start with a full copy of default gear

  if (initialState?.gear) {
    // Iterate over keys provided in initialState.gear
    for (const gearId in initialState.gear) {
      // Check if the key exists in both initialState.gear and defaultState.gear
      if (Object.prototype.hasOwnProperty.call(initialState.gear, gearId) && gearId in mergedGear) {
        const initialSlots = initialState.gear[gearId as keyof typeof initialState.gear]
        const defaultSlots = defaultState.gear[gearId as keyof typeof defaultState.gear]
        // Merge the slots for this gear piece
        mergedGear[gearId as keyof typeof mergedGear] = {
          ...defaultSlots, // Start with default slots
          ...initialSlots, // Overwrite with initial slots
        }
      }
      // If gearId from initialState is not in defaultState, it's ignored (shouldn't happen with GearPieceId type)
    }
  }

  const mergedState: CharmCalculatorState = {
    // Spread default and initial for top-level (like inventory)
    ...defaultState,
    ...initialState,
    // Assign the carefully merged gear object
    gear: mergedGear,
    // Ensure inventory is also merged correctly if provided
    inventory: {
      ...defaultState.inventory,
      ...initialState?.inventory,
    },
  }

  return ref(mergedState)
}

// Adjust describe block to handle async createMockState
describe('useChiefCharmCalculator', () => {
  it('calculates total cost correctly', async () => { // Make test async
    const state = await createMockState({ // Await the state creation
      gear: {
        coat: {
          0: { from: 'c2', to: 'c3' }, // Cost: c3 = (30,2,1)
          1: { from: undefined, to: undefined }, // Cost: (0,0,0)
        },
        hat: {
          0: { from: 'c0', to: 'c2' }, // Cost: c1 + c2 = (10,0,0) + (20,1,0) = (30,1,0)
          1: { from: 'c1', to: 'c3' }, // Cost: c2 + c3 = (20,1,0) + (30,2,1) = (50,3,1)
        },
        // Other gear pieces will exist due to dynamic creation
      },
    } as unknown as Partial<CharmCalculatorState>) // Cast via unknown
    const { totalCost } = useChiefCharmCalculator(state)

    // Total: (30+50+30, 1+3+2, 0+1+1) = (110, 6, 2)
    expect(totalCost.value).toEqual({
      charmDesign: 110,
      charmGuide: 6,
      charmSecret: 2,
    })
  })

  it('calculates total cost as zero when no selections', async () => { // Make test async
    const state = await createMockState() // Await the state creation (no initial state, no cast needed)
    const { totalCost } = useChiefCharmCalculator(state)
    expect(totalCost.value).toEqual({ charmDesign: 0, charmGuide: 0, charmSecret: 0 })
  })

  it('calculates total cost as zero when "to" is not after "from"', async () => { // Make test async
    const state = await createMockState({ // Await the state creation
      gear: {
        coat: {
          0: { from: 'c3', to: undefined }, // No 'to'
          1: { from: undefined, to: 'c2' }, // No 'from'
        },
        hat: {
          0: { from: 'c2', to: 'c1' }, // Invalid range
          1: { from: 'c1', to: 'c1' }, // Invalid range
        },
        // Other gear pieces will exist
      },
    } as unknown as Partial<CharmCalculatorState>) // Cast via unknown
    const { totalCost } = useChiefCharmCalculator(state)
    expect(totalCost.value).toEqual({ charmDesign: 0, charmGuide: 0, charmSecret: 0 })
  })

  it('calculates remaining cost correctly', async () => { // Make test async
    const state = await createMockState({ // Await the state creation
      gear: {
        hat: {
          0: { from: 'c0', to: 'c2' }, // Total Cost: (30, 1, 0)
        },
        // coat is included by default from createMockState
      },
      inventory: {
        charmDesign: 20,
        charmGuide: 5,
        charmSecret: 0,
      },
    } as unknown as Partial<CharmCalculatorState>) // Cast via unknown
    const { remainingCost } = useChiefCharmCalculator(state)

    // Remaining: (max(0, 30-20), max(0, 1-5), max(0, 0-0)) = (10, 0, 0)
    expect(remainingCost.value).toEqual({
      charmDesign: 10,
      charmGuide: 0,
      charmSecret: 0,
    })
  })

  it('calculates remaining cost when inventory exceeds total', async () => { // Make test async
    const state = await createMockState({ // Await the state creation
      gear: {
        hat: {
          0: { from: 'c0', to: 'c1' }, // Total Cost: (10, 0, 0)
        },
        // coat is included by default
      },
      inventory: {
        charmDesign: 100,
        charmGuide: 10,
        charmSecret: 1,
      },
    } as unknown as Partial<CharmCalculatorState>) // Cast via unknown
    const { remainingCost } = useChiefCharmCalculator(state)

    // Remaining: (max(0, 10-100), max(0, 0-10), max(0, 0-1)) = (0, 0, 0)
    expect(remainingCost.value).toEqual({
      charmDesign: 0,
      charmGuide: 0,
      charmSecret: 0,
    })
  })

  it('updates hasRemainingCost correctly', async () => { // Make test async
    const state = await createMockState({ // Await the state creation
      gear: {
        hat: {
          0: { from: 'c0', to: 'c2' }, // Total Cost: (30, 1, 0)
        },
        // coat is included by default
      },
      inventory: {
        charmDesign: 0, // Needs 30
        charmGuide: 0, // Needs 1
        charmSecret: 0,
      },
    } as unknown as Partial<CharmCalculatorState>) // Cast via unknown
    const { hasRemainingCost } = useChiefCharmCalculator(state)
    expect(hasRemainingCost.value).toBe(true)

    // Update inventory to meet needs
    state.value.inventory.charmDesign = 30
    state.value.inventory.charmGuide = 1
    expect(hasRemainingCost.value).toBe(false)

    // Update inventory to be insufficient again
    state.value.inventory.charmDesign = 29
    expect(hasRemainingCost.value).toBe(true)
  })
})
