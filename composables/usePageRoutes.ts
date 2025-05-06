interface PageRoute {
  icon?: string
  iconColorClass?: string
  imagePath?: string
  path: string
  title: string
}

/**
 * Composable that provides access to application page routes.
 *
 * This function filters the Vue Router routes to exclude the homepage and dynamic routes,
 * and transforms them into a more consumable format with consistent naming and optional icons.
 *
 * @example
 * ```ts
 * const { pages } = usePageRoutes()
 * // Access all available pages in the application
 * console.log(pages.value)
 * ```
 */
export default function usePageRoutes(): { pages: ComputedRef<PageRoute[]> } {
  const router = useRouter()

  // All available pages in the application, excluding the homepage and dynamic routes
  const pages = computed<PageRoute[]>(() => {
    const routes = router.getRoutes()
      .filter(({ path }) => path !== '/' && !path.includes(':'))
      .map(({ meta, path }) => ({
        icon: meta?.icon as string | undefined,
        iconColorClass: meta?.iconColorClass as string | undefined,
        imagePath: meta?.imagePath as string | undefined,
        path,
        title: useIsString(meta?.title) ?
            meta.title.replace('for Whiteout Survival', '').trim()
          : useStartCase(path),
      }))

    return useSortBy(routes, ['title'])
  })

  return {
    pages,
  }
}
