import { vi } from 'vitest'

/**
 * Creates a simple mock for onMounted in tests
 *
 * This function creates a no-op mock for onMounted to prevent warnings
 * in tests. It also provides a way to manually call the loadStateFromURL
 * function in tests.
 *
 * @example
 * // In your test file:
 * import { mockOnMounted } from '~/tests/helpers/vue-hooks'
 *
 * // Mock onMounted
 * mockOnMounted()
 *
 * // In your test:
 * const component = useMyComponent()
 * component.loadStateFromURL() // Call this manually
 */
export function mockOnMounted() {
  // Mock onMounted to be a no-op function
  vi.mock('vue', async () => {
    const actual = await vi.importActual('vue')

    return {
      ...(actual as Record<string, unknown>),
      onMounted: vi.fn(),
    }
  })
}
