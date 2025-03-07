/**
 * Composable that handles scrolling into view for input elements on mobile devices.
 * Provides special handling for virtual keyboards using the VirtualKeyboard API when available.
 *
 * @returns {object} An object containing the mobileScrollIntoView method
 * @property {Function} mobileScrollIntoView - Event handler that scrolls the target element into view on mobile devices
 *
 * @example
 * ```ts
 * const { mobileScrollIntoView } = useMobileScrollIntoView()
 *
 * // Use in template
 * <input @focus="mobileScrollIntoView" />
 * ```
 */
export default function useMobileScrollIntoView() {
  return {
    /**
     * Handles scrolling elements into view on touch devices
     */
    mobileScrollIntoView(event: Event) {
      if (!import.meta.client)
        return

      const isTouchDevice = globalThis.matchMedia('(pointer: coarse)').matches
      if (!isTouchDevice)
        return

      const target = event.target as HTMLElement

      if ('virtualKeyboard' in navigator) {
        navigator.virtualKeyboard!.overlaysContent = true
        navigator.virtualKeyboard!.addEventListener('geometrychange', (event: VirtualKeyboardGeometryChangeEvent) => {
          const { height } = event.boundingRect
          if (height > 0)
            target.scrollIntoView({ block: 'nearest' })
        }, { once: true })
      }
      else {
        setTimeout(() => {
          target.scrollIntoView({ block: 'nearest' })
        }, 200)
      }
    },
  }
}
