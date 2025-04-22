import { mount } from '@vue/test-utils'
import type { Pinia } from 'pinia' // Import Pinia, setActivePinia
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest' // Import vi
import { defineComponent, nextTick, ref } from 'vue' // Import defineComponent, ref

import useChiefCharmState from './useChiefCharmState'

// Mock Nuxt modules
vi.mock('#app', () => ({
  useRoute: () => ({ query: ref({}) }),
  useRouter: () => ({ replace: vi.fn() }),
  useRuntimeConfig: () => ({ public: { storagePrefix: 'test-' } }),
}))

// Mock constants (assuming auto-import isn't reliable in tests)
vi.mock('~/constants/chief-gear', () => ({
  GEAR_PIECES: [
    { id: 'hat', name: 'Hat' },
    { id: 'coat', name: 'Coat' },
    // Add other gear pieces if needed for specific tests
  ],
}))
vi.mock('~/constants/chief-charm', () => ({
  CHARM_MATERIALS: [
    { key: 'charmDesign', label: 'Charm Design' },
    { key: 'charmGuide', label: 'Charm Guide' },
    { key: 'charmSecret', label: 'Charm Secret' },
  ],
  CHARM_SLOTS_PER_GEAR: 2,
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

describe('useChiefCharmState', () => {
  let pinia: Pinia

  // Helper component to use the composable
  const TestComponent = defineComponent({
    setup() {
      return { ...useChiefCharmState() }
    },
    template: '<div />',
  })

  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear()
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('initializes with default state', () => {
    const wrapper = mount(TestComponent, { global: { plugins: [pinia] } })
    const { state } = wrapper.vm

    expect(state.gear.hat[0]).toEqual({ from: undefined, to: undefined })
    expect(state.gear.hat[1]).toEqual({ from: undefined, to: undefined })
    expect(state.gear.coat[0]).toEqual({ from: undefined, to: undefined })
    expect(state.gear.coat[1]).toEqual({ from: undefined, to: undefined })
    expect(state.inventory).toEqual({ charmDesign: 0, charmGuide: 0, charmSecret: 0 })
  })

  it('clears all state', () => {
    const wrapper = mount(TestComponent, { global: { plugins: [pinia] } })
    const { clearAll, state } = wrapper.vm

    // Modify state
    state.gear.hat[0].from = 'c1'
    state.gear.hat[0].to = 'c2'
    state.inventory.charmDesign = 100

    clearAll()

    expect(state.gear.hat[0]).toEqual({ from: undefined, to: undefined })
    expect(state.inventory).toEqual({ charmDesign: 0, charmGuide: 0, charmSecret: 0 })
  }) // Removed extra closing parenthesis/bracket if present

  it('handles "from" level change correctly (autoSetNext=true)', async () => {
    const wrapper = mount(TestComponent, { global: { plugins: [pinia] } })
    const { handleFromChange, state } = wrapper.vm

    // Set 'from' to c1, 'to' should become c2
    handleFromChange('hat', 0, 'c1')
    await nextTick()
    expect(state.gear.hat[0]).toEqual({ from: 'c1', to: 'c2' })

    // Set 'from' to c2, 'to' should become c3
    handleFromChange('hat', 0, 'c2')
    await nextTick()
    expect(state.gear.hat[0]).toEqual({ from: 'c2', to: 'c3' })

    // Set 'from' to c3 (last level), 'to' should become undefined
    handleFromChange('hat', 0, 'c3')
    await nextTick()
    expect(state.gear.hat[0]).toEqual({ from: 'c3', to: undefined })

    // Clear 'from', 'to' should become undefined
    handleFromChange('hat', 0, undefined)
    await nextTick()
    expect(state.gear.hat[0]).toEqual({ from: undefined, to: undefined })
  })

  it('handles "from" level change correctly (autoSetNext=false)', async () => {
    const wrapper = mount(TestComponent, { global: { plugins: [pinia] } })
    const { handleFromChange, state } = wrapper.vm

    // Set initial state
    state.gear.hat[0].from = 'c0'
    state.gear.hat[0].to = 'c3'

    // Set 'from' to c1, 'to' should remain c3 (valid)
    handleFromChange('hat', 0, 'c1', false)
    await nextTick()
    expect(state.gear.hat[0]).toEqual({ from: 'c1', to: 'c3' })

    // Set 'from' to c2, 'to' should become undefined (invalid)
    handleFromChange('hat', 0, 'c2', false)
    await nextTick()
    expect(state.gear.hat[0]).toEqual({ from: 'c2', to: undefined })

    // Clear 'from', 'to' should become undefined
    handleFromChange('hat', 0, undefined, false)
    await nextTick()
    expect(state.gear.hat[0]).toEqual({ from: undefined, to: undefined })
  })

  it('handles "to" level change', async () => {
    const wrapper = mount(TestComponent, { global: { plugins: [pinia] } })
    const { handleToChange, state } = wrapper.vm

    state.gear.hat[0].from = 'c1' // Pre-set 'from'

    handleToChange('hat', 0, 'c3')
    await nextTick()
    expect(state.gear.hat[0].to).toBe('c3')

    handleToChange('hat', 0, undefined)
    await nextTick()
    expect(state.gear.hat[0].to).toBeUndefined()
  })

  // TODO: Add tests for query parameter loading/saving
  // TODO: Add tests for getFilteredToOptions
  // TODO: Add tests for hasAnySelectionOrInventory
})
