import { createTestingPinia } from '@pinia/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useLocalSettings } from '~/stores/local-settings'

const { localSettings } = useLocalSettings()

describe('useLocalSettings', () => {
  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
    })

    useLocalSettings(pinia)
  })

  it('initializes with default values', () => {
    expect(localSettings.useUtcTime).toBe(false)
  })

  it('can toggle UTC time setting', () => {
    localSettings.useUtcTime = true
    expect(localSettings.useUtcTime).toBe(true)
  })
})
