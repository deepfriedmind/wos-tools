import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import CopyButton from '~/components/CopyButton.vue'
import { setupGlobalPlugins } from '~/tests/helpers/plugins'
import { mockPrimeVueToast, mockToast } from '~/tests/helpers/primevue'

interface Props {
  copyString: string
  successClass?: string
}

const mockCopy = vi.fn()
const mockClipboard = {
  copied: shallowRef(false),
  copy: mockCopy,
}

// Define URL before tests
const testUrl = 'https://example.com/test-page'

// Mock VueUse's useClipboard completely
vi.mock('@vueuse/core', () => ({
  useClipboard: () => mockClipboard,
}))

// Set up window.location for the test environment
Object.defineProperty(globalThis, 'location', {
  value: {
    href: testUrl,
  },
  writable: true,
})

// Mock Nuxt composables
vi.mock('#imports', async () => {
  const actual = await vi.importActual('#imports')

  return {
    ...actual as Record<string, unknown>,
    useRequestURL: () => ({
      href: testUrl,
    }),
    useToast: () => mockToast,
  }
})

// Mock PrimeVue toast
vi.mock('primevue/usetoast', () => ({
  default: () => mockToast,
  PrimeVueToastSymbol: Symbol('mock-toast'),
  useToast: () => mockToast,
}))

function mountComponent(props?: Partial<Props>) {
  return mount(CopyButton, {
    global: {
      plugins: [
        PrimeVue,
        ToastService,
      ],
      ...setupGlobalPlugins().global,
    },
    props: {
      copyString: 'Test text',
      ...props,
    },
    slots: {
      default: 'Copy',
    },
  })
}

describe('copyButton', () => {
  beforeEach(() => {
    mockPrimeVueToast()
    mockCopy.mockImplementation(async () => {
      mockClipboard.copied.value = true

      return true
    })
    mockToast.add.mockClear()
    mockCopy.mockClear()
    mockClipboard.copied.value = false
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders a button with slot content', () => {
      const wrapper = mountComponent()
      const button = wrapper.find('button')

      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('Copy')
    })

    it('applies success class when copied', async () => {
      const wrapper = mountComponent()
      const button = wrapper.find('button')

      expect(button.classes()).not.toContain('text-green-500')

      await button.trigger('click')

      expect(button.classes()).toContain('text-green-500')
    })

    it('applies custom success class when provided', async () => {
      const wrapper = mountComponent({
        copyString: 'Text to copy',
        successClass: 'custom-success-class',
      })
      const button = wrapper.find('button')

      expect(button.classes()).not.toContain('custom-success-class')

      await button.trigger('click')

      expect(button.classes()).toContain('custom-success-class')
    })
  })

  describe('functionality', () => {
    it('copies text provided in copyString prop', async () => {
      const copyString = 'Text to be copied'
      const wrapper = mountComponent({ copyString })
      const button = wrapper.find('button')

      await button.trigger('click')

      expect(mockCopy).toHaveBeenCalledTimes(1)
      expect(mockCopy).toHaveBeenCalledWith(copyString)
    })

    it('copies current URL when copyString is "currentUrl"', async () => {
      const wrapper = mountComponent({ copyString: 'currentUrl' })
      const button = wrapper.find('button')

      await button.trigger('click')

      expect(mockCopy).toHaveBeenCalledTimes(1)
      expect(mockCopy).toHaveBeenCalledWith(testUrl)
    })

    it('does nothing when copyString is empty', async () => {
      const wrapper = mountComponent({ copyString: '' })
      const button = wrapper.find('button')

      await button.trigger('click')

      expect(mockCopy).not.toHaveBeenCalled()
    })

    it('shows error toast when clipboard write fails', async () => {
      // Mock console.error to prevent noise in test output
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      // Setup error state
      mockClipboard.copied.value = false
      const error = new Error('Clipboard write failed')
      mockCopy.mockRejectedValueOnce(error)

      // Setup component and trigger error
      const wrapper = mountComponent({ copyString: 'will fail' })
      await wrapper.find('button').trigger('click')

      // Need to flush promises to ensure error handling completes
      await flushPromises()

      // Verify error handling
      expect(mockToast.add).toHaveBeenCalledWith({
        detail: 'Could not copy to clipboard.',
        life: 3000,
        severity: 'error',
        summary: 'Error',
      })

      // Verify error was logged
      expect(consoleErrorSpy).toHaveBeenCalledWith(error)

      // Clean up
      consoleErrorSpy.mockRestore()
    })
  })
})
