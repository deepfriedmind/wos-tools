/**
 * Composable for managing the sticky header state.
 *
 * This function creates and manages a global state for the sticky header feature.
 * It provides access to the current state (readonly) and a method to update it.
 *
 * @returns An object containing:
 * - `isStickyHeaderEnabled` - Readonly ref boolean indicating if sticky header is enabled
 * - `setIsStickyHeaderEnabled` - Function to update the sticky header state
 *
 * @example
 * ```
 * const { isStickyHeaderEnabled, setIsStickyHeaderEnabled } = useStickyHeader()
 *
 * // Check current state
 * console.log(isStickyHeaderEnabled.value)
 *
 * // Disable sticky header
 * setIsStickyHeaderEnabled(false)
 * ```
 */
export default function useStickyHeader() {
  const isStickyHeaderEnabled = useState<boolean>('sticky-header-enabled', () => true)

  const setIsStickyHeaderEnabled = (value: boolean) => {
    isStickyHeaderEnabled.value = value
  }

  return {
    isStickyHeaderEnabled: readonly(isStickyHeaderEnabled),
    setIsStickyHeaderEnabled,
  }
}
