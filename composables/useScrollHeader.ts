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
