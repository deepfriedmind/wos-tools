import { createTestingPinia } from '@pinia/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useLocalSettings } from '~/stores/local-settings'

// Mock onMounted to be a no-op function
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')

  return {
    ...(actual as Record<string, unknown>),
    onMounted: vi.fn(),
  }
})

const { localSettings } = useLocalSettings()

describe('useLocalSettings', () => {
  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
    })

    useLocalSettings(pinia)
  })

  it('initializes with default values', () => {
    const store = useLocalSettings()
    store.updateTimezoneInfo()
    expect(localSettings.useUtcTime).toBe(false)
  })

  it('can toggle UTC time setting', () => {
    const store = useLocalSettings()
    store.updateTimezoneInfo()
    localSettings.useUtcTime = true
    expect(localSettings.useUtcTime).toBe(true)
  })
})
