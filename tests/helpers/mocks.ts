import { vi } from 'vitest'
import { ref } from 'vue'

interface MockStorageReturn {
  clear: () => void
  storage: Map<string, unknown>
}

export function mockDayjs(): void {
  vi.mock('#imports', () => ({
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
  }))
}

export function mockFocusTrap(): void {
  vi.mock('@vueuse/integrations/useFocusTrap', () => ({
    useFocusTrap: () => ({
      activate: vi.fn(),
      deactivate: vi.fn(),
    }),
  }))
}

export function mockLocalStorage(): MockStorageReturn {
  const mockStorage = new Map<string, unknown>()

  vi.mock('#imports', () => ({
    useLocalStorage: vi.fn(<T>(key: string, defaultValue: T) => {
      if (!mockStorage.has(key))
        mockStorage.set(key, defaultValue)

      return ref<T>(mockStorage.get(key) as T)
    }),
  }))

  return {
    clear: () => mockStorage.clear(),
    storage: mockStorage,
  }
}

export function mockResetCountdown(): void {
  vi.mock('~/composables/useResetCountdown', () => ({
    default: () => ({
      error: ref(false),
      secondsUntilReset: ref(24 * 3600), // 24 hours in seconds
    }),
  }))
}
