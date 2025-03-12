import { vi } from 'vitest'

interface MockStorageReturn {
  clear: () => void
  storage: Map<string, unknown>
}

export function mockDayjs(): void {
  vi.mock('#imports', async () => {
    const actual = await vi.importActual('#imports')

    return {
      ...(actual as Record<string, unknown>),
      useDayjs: () => ({
        duration: (value: number) => ({
          asSeconds: () => value / 1000,
          format: () => {
            const totalSeconds = value / 1000
            const hours = Math.floor(totalSeconds / 3600)
            const minutes = Math.floor((totalSeconds % 3600) / 60)
            const seconds = Math.floor(totalSeconds % 60)

            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
          },
        }),
      }),
    }
  })
}

export function mockLocalStorage(): MockStorageReturn {
  const mockStorage = new Map<string, unknown>()

  vi.mock('#imports', async () => {
    const actual = await vi.importActual('#imports')

    return {
      ...(actual as Record<string, unknown>),
      useLocalStorage: vi.fn(<T>(key: string, defaultValue: T) => {
        if (!mockStorage.has(key))
          mockStorage.set(key, defaultValue)

        return {
          value: mockStorage.get(key) as T,
        }
      }),
    }
  })

  return {
    clear: () => mockStorage.clear(),
    storage: mockStorage,
  }
}

export function mockResetCountdown(): void {
  vi.mock('~/composables/useResetCountdown', () => ({
    default: () => ({
      error: shallowRef(false),
      secondsUntilReset: shallowRef(24 * 3600), // 24 hours in seconds
    }),
  }))
}

export const DrawerStub = defineComponent({
  data() {
    return {
      isVisible: false,
    }
  },
  props: {
    position: { default: 'right', type: String },
    visible: { default: false, type: Boolean },
  },
  template: '<div class="p-drawer" :class="{ \'p-drawer-visible\': isVisible }"><slot name="header" /><slot /></div>',
  watch: {
    visible(value: boolean) {
      this.isVisible = value
    },
  },
})

export const ToggleSwitchStub = defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: { required: true, type: Boolean },
  },
  template: '<div class="p-toggleswitch" role="switch" @click="$emit(\'update:modelValue\', !modelValue)"></div>',
})

export const RouterLinkStub = {
  name: 'RouterLink',
  props: ['to'],
  template: '<a><slot /></a>',
}
