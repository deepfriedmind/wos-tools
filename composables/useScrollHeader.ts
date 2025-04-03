export const ScrollDirection = {
  DOWN: 'down',
  UP: 'up',
} as const

export type ScrollDirectionType = typeof ScrollDirection[keyof typeof ScrollDirection]

interface ScrollHeaderOptions {
  backgroundThreshold?: number
  hideThreshold?: number
  minScrollDelta?: number
  throttleDelay?: number
}

/**
 * A composable function that tracks scroll position to control header visibility and appearance.
 *
 * This function helps implement common scroll-based header behaviors such as:
 * - Changing header background/style after scrolling a certain distance
 * - Hiding the header when scrolling down and showing it when scrolling up
 * - Efficiently tracking scroll direction with throttling
 *
 * @param options - Configuration options for scroll behavior
 * @param options.backgroundThreshold - Scroll position (in pixels) at which the header background should change (default: 63)
 * @param options.hideThreshold - Scroll position (in pixels) at which the header may hide when scrolling down (default: 250)
 * @param options.minScrollDelta - Minimum scroll distance (in pixels) required to trigger a direction change (default: 5)
 * @param options.throttleDelay - Delay in milliseconds for throttling scroll event processing (default: 16)
 *
 * @returns An object containing reactive scroll state:
 *  - direction: Current scroll direction (UP or DOWN)
 *  - isScrolled: Whether the page has scrolled beyond the backgroundThreshold
 *  - scrollY: Current vertical scroll position
 *  - shouldHideHeader: Whether the header should be hidden (true when scrolling down past hideThreshold)
 */
export function useScrollHeader(options: ScrollHeaderOptions = {}) {
  const {
    backgroundThreshold = 63,
    hideThreshold = 250,
    minScrollDelta = 5,
    throttleDelay = 16,
  } = options

  const { y } = useWindowScroll()
  const lastScrollY = shallowRef(0)
  const direction = shallowRef<ScrollDirectionType>(ScrollDirection.UP)

  const updateScrollDirection = useThrottleFn(() => {
    const currentScrollY = y.value
    if (Math.abs(currentScrollY - lastScrollY.value) > minScrollDelta) {
      direction.value = currentScrollY > lastScrollY.value ?
        ScrollDirection.DOWN
        : ScrollDirection.UP
      lastScrollY.value = currentScrollY
    }
  }, throttleDelay)

  watch(() => y.value, updateScrollDirection, { immediate: true })

  const isScrolled = computed(() => y.value > backgroundThreshold)
  const shouldHideHeader = computed(() =>
    y.value > hideThreshold && direction.value === ScrollDirection.DOWN,
  )

  return {
    direction,
    isScrolled,
    scrollY: y,
    shouldHideHeader,
  }
}
