import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import GatheringAmountCalculator from '~/pages/gathering-amount-calculator.vue'
import { mockDayjs, mockFocusTrap, mockLocalStorage, mockResetCountdown } from '~/tests/helpers/mocks'
import { mockPrimeVueComponents } from '~/tests/helpers/primevue'
import type { ExposedProperties } from '~/types/gathering'
import { BOOST_TYPES } from '~/types/gathering'

type TestedComponent = VueWrapper<ExposedProperties>

describe('gatheringAmountCalculator', () => {
  let wrapper: TestedComponent

  beforeEach(async () => {
    mockDayjs()
    mockPrimeVueComponents()
    mockFocusTrap()
    mockResetCountdown()
    mockLocalStorage()

    wrapper = mount(GatheringAmountCalculator, {
      global: {
        plugins: [PrimeVue, ToastService],
        stubs: {
          Divider: true,
          Icon: true,
          IftaLabel: true,
          Panel: true,
        },
      },
    }) as TestedComponent

    await vi.dynamicImportSettled()
  })

  it('mounts successfully', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  describe('resource nodes', () => {
    it('displays all resource nodes', () => {
      const cards = wrapper.findAllComponents({ name: 'Card' })
      expect(cards).toHaveLength(4)

      const nodeNames = ['Meat', 'Wood', 'Coal', 'Iron']
      for (const name of nodeNames)
        expect(wrapper.text()).toContain(name)
    })
  })

  describe('calculations', () => {
    it('correctly identifies fastest gathered node', () => {
      const { fastestGatheredNode } = wrapper.vm
      expect(['Meat', 'Wood']).toContain(fastestGatheredNode.rssName)
    })

    it('shows correct resource amounts for different boost combinations', () => {
      const { resourceCards } = wrapper.vm
      for (const { amounts } of resourceCards) {
        expect(amounts).toHaveProperty(BOOST_TYPES.BOTH)
        expect(amounts).toHaveProperty(BOOST_TYPES.CITY)
        expect(amounts).toHaveProperty(BOOST_TYPES.EXPEDITION)
        expect(amounts).toHaveProperty(BOOST_TYPES.NONE)
      }
    })
  })

  describe('user interactions', () => {
    it('selects input content on focus', async () => {
      const inputs = wrapper.findAll('input[type="number"]')
      for (const input of inputs) {
        const mockSelect = vi.fn()
        Object.defineProperty(input.element, 'select', {
          value: mockSelect,
          writable: true,
        })
        await input.trigger('focus')
        expect(mockSelect).toHaveBeenCalled()
      }
    })
  })
})
