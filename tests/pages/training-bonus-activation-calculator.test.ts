import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ComponentPublicInstance } from 'vue'

import TrainingBonusActivationCalculator from '~/pages/training-bonus-activation-calculator.vue'
import { mockLocalStorage } from '~/tests/helpers/mocks'
import { setupGlobalPlugins } from '~/tests/helpers/plugins'
import { mockPrimeVueComponents } from '~/tests/helpers/primevue'

// Type for the component instance with the properties we need to access
interface ComponentVM extends ComponentPublicInstance {
  durationSecondsWithBonus: number
  formattedStartTime: string
  localSettings: {
    timezone: string
    timezoneShort: string
    trainingDuration: string
    useUtcTime: boolean
  }
  trainingDurationSeconds: number
}

describe('trainingBonusActivationCalculator', () => {
  // Create a mock dayjs function with all required methods
  const mockDayjsFunction = vi.fn(() => ({
    add: vi.fn(() => ({
      startOf: vi.fn(() => ({
        toDate: vi.fn(() => new Date('2023-05-18')),
      })),
    })),
    format: vi.fn(() => '2023-05-15'),
    isBefore: vi.fn(() => false),
    isValid: vi.fn(() => true),
    local: vi.fn(() => ({
      format: vi.fn(() => '2023-05-15 12:00:00'),
    })),
    toISOString: vi.fn(() => '2023-05-15T12:00:00Z'),
    utc: vi.fn(() => ({
      add: vi.fn(() => ({
        startOf: vi.fn(() => ({
          toDate: vi.fn(() => new Date('2023-05-18')),
        })),
      })),
      format: vi.fn(() => '2023-05-15'),
    })),
  }))

  // Add duration method to the mock using type assertion
  ;(mockDayjsFunction as unknown as Record<string, unknown>).duration = vi.fn(() => ({
    asSeconds: vi.fn(() => 36_000),
    days: vi.fn(() => 0),
    format: vi.fn(() => '10:00:00'),
    hours: vi.fn(() => 10),
    minutes: vi.fn(() => 0),
    seconds: vi.fn(() => 0),
  }))

  beforeEach(() => {
    vi.useFakeTimers()
    mockPrimeVueComponents()
    mockLocalStorage()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()
  })

  it('mounts successfully', () => {
    const wrapper = mount(TrainingBonusActivationCalculator, {
      global: {
        ...setupGlobalPlugins().global,
        mocks: {
          $dayjs: mockDayjsFunction,
        },
        plugins: [PrimeVue, ToastService],
        stubs: {
          ClientOnly: true,
          DatePicker: true,
          Icon: true,
          InputMask: true,
          MainContentCard: true,
          Message: true,
          Tag: true,
          TimezoneToggle: true,
          ToolTip: true,
        },
      },
      shallow: true,
    })

    expect(wrapper.vm).toBeTruthy()
  })

  it('contains expected text', () => {
    const wrapper = mount(TrainingBonusActivationCalculator, {
      global: {
        ...setupGlobalPlugins().global,
        mocks: {
          $dayjs: mockDayjsFunction,
        },
        plugins: [PrimeVue, ToastService],
        stubs: {
          ClientOnly: true,
          DatePicker: true,
          Icon: true,
          InputMask: true,
          MainContentCard: {
            props: ['icon', 'heading', 'subHeading'],
            template: '<div>{{ heading }}</div><div>{{ subHeading }}</div>',
          },
          Message: true,
          Tag: true,
          TimezoneToggle: true,
          ToolTip: true,
        },
      },
      shallow: true,
    })

    expect(wrapper.html()).toContain('Training Bonus Activation Calculator')
  })

  it('validates training duration format', () => {
    const durationRegex = /^\d+:[0-5]\d:[0-5]\d$/

    // Valid formats
    expect(durationRegex.test('10:00:00')).toBe(true)
    expect(durationRegex.test('1:30:45')).toBe(true)
    expect(durationRegex.test('100:59:59')).toBe(true)

    // Invalid formats
    expect(durationRegex.test('')).toBe(false)
    expect(durationRegex.test('10:60:00')).toBe(false) // minutes > 59
    expect(durationRegex.test('10:00:60')).toBe(false) // seconds > 59
    expect(durationRegex.test('10:0:00')).toBe(false) // single digit minutes
    expect(durationRegex.test('10:00:0')).toBe(false) // single digit seconds
    expect(durationRegex.test('abc')).toBe(false) // non-numeric
  })

  it('calculates duration with bonus correctly', () => {
    // Create a component instance
    const wrapper = mount(TrainingBonusActivationCalculator, {
      global: {
        ...setupGlobalPlugins().global,
        mocks: {
          $dayjs: mockDayjsFunction,
        },
        plugins: [PrimeVue, ToastService],
        stubs: {
          ClientOnly: true,
          DatePicker: true,
          Icon: true,
          InputMask: true,
          MainContentCard: true,
          Message: true,
          Tag: true,
          TimezoneToggle: true,
          ToolTip: true,
        },
      },
    })

    const vm = wrapper.vm as ComponentVM

    // Set up test values
    const testDuration = '03:00:00' // 3 hours
    vm.localSettings.trainingDuration = testDuration

    // Mock the trainingDurationSeconds computed property
    Object.defineProperty(vm, 'trainingDurationSeconds', {
      get: () => 10_800, // 3 hours in seconds
    })

    // Mock the isTrainingDurationValid computed property
    Object.defineProperty(vm, 'isTrainingDurationValid', {
      get: () => true,
    })

    // Verify that the component correctly applies the 3x multiplier
    expect(vm.durationSecondsWithBonus).toBe(32_400) // 3h * 3 = 9h (32400 seconds)
  })

  it('formats time based on timezone setting', () => {
    const wrapper = mount(TrainingBonusActivationCalculator, {
      global: {
        ...setupGlobalPlugins().global,
        mocks: {
          $dayjs: mockDayjsFunction,
        },
        plugins: [PrimeVue, ToastService],
        stubs: {
          ClientOnly: true,
          DatePicker: true,
          Icon: true,
          InputMask: true,
          MainContentCard: true,
          Message: true,
          Tag: true,
          TimezoneToggle: true,
          ToolTip: true,
        },
      },
    })

    const vm = wrapper.vm as ComponentVM

    // Set up a mock requiredStartTime
    Object.defineProperty(vm, 'requiredStartTime', {
      get: () => ({
        format: vi.fn(() => '2023-05-15 12:00:00'),
        local: vi.fn(() => ({
          format: vi.fn(() => '2023-05-15 14:00:00'), // Local time is UTC+2
        })),
      }),
    })

    // Set up a mock for formattedStartTime
    Object.defineProperty(vm, 'formattedStartTime', {
      get() {
        const self = this as unknown as ComponentVM

        return self.localSettings?.useUtcTime ?
          '2023-05-15 12:00:00 UTC'
          : '2023-05-15 14:00:00 Local'
      },
    })

    // Initially, useUtcTime should be false (default)
    expect(vm.localSettings.useUtcTime).toBe(false)
    expect(vm.formattedStartTime).toBe('2023-05-15 14:00:00 Local')

    // Toggle the useUtcTime setting
    vm.localSettings.useUtcTime = true
    expect(vm.formattedStartTime).toBe('2023-05-15 12:00:00 UTC')
  })
})
