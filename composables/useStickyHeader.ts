/**
 * Manages the global state for enabling/disabling the sticky/scroll header behavior.
 */
export function useStickyHeader() {
  const isStickyHeaderEnabled = useState<boolean>('sticky-header-enabled', () => true)

  const setIsStickyHeaderEnabled = (value: boolean) => {
    isStickyHeaderEnabled.value = value
  }

  return {
    isStickyHeaderEnabled: readonly(isStickyHeaderEnabled),
    setIsStickyHeaderEnabled,
  }
}
