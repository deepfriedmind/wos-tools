interface PageRoute {
  icon?: string
  path: string
  title: string
}

/**
 * Composable that provides access to application page routes.
 *
 * This function filters the Vue Router routes to exclude the homepage and dynamic routes,
 * and transforms them into a more consumable format with consistent naming and optional icons.
 *
 * @returns {ComputedRef<PageRoute[]>} pages - Computed array of page routes excluding homepage and dynamic routes
 *
 * @example
 * ```ts
 * const { pages } = usePageRoutes()
 * // Access all available pages in the application
 * console.log(pages.value)
 * ```
 */
export function usePageRoutes() {
  const router = useRouter()

  // All available pages in the application, excluding the homepage and dynamic routes
  const pages = computed<PageRoute[]>(() => {
    const routes = router.getRoutes()
      .filter(route => route.path !== '/' && !route.path.includes(':'))
      .map(route => ({
        icon: route.meta?.icon as string | undefined,
        path: route.path,
        title: useIsString(route.meta?.title) ?
            route.meta.title.replace('for Whiteout Survival', '').trim()
          : useStartCase(route.path),
      }))

    return useSortBy(routes, ['title'])
  })

  return {
    pages,
  }
}
