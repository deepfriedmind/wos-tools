Place test files in the same directory as the file being tested (co-located), except for `/pages` and `/layouts`, which should be placed in their respective directories in `/tests`.

Put reusable mocks in `tests/helpers/mocks.ts`.

Put global plugin setup in `tests/helpers/plugins.ts`.

Put PrimeVue component mocks in `tests/helpers/primevue.ts`.

Use `~/` syntax for imports.

Use Vitest with `@nuxt/test-utils` for testing.

Use `setup()` from `@nuxt/test-utils` in test files.

Test components using `mount` from `@vue/test-utils`.

Mock `useAsyncData` with `vi.mock`.

Test error states in data fetching.

Verify Pinia store mutations with `createPinia`.

Test middleware with `mockNuxtMiddleware`.

Mock HTTP requests using `vi.mock('ofetch')`.

Mock runtime config with `mockNuxtConfig`.

Test server routes with `createServerComponent`.

Use `renderSuspended` for async components.

Mock client-only components with `mockComponent`.

Test form validation error states.

Verify computed property updates.

Test component slot content rendering.

Mock `useFetch` for API testing.

Test store action side effects.

Verify error boundary handling.

Test loading state transitions.

Test PrimeVue component events.

Verify state management with `@pinia/testing`.

Test component lifecycle hooks.

Verify meta tag updates with `useHead`.

Test form submission flows.

Mock navigation with `mockNavigateTo`.

Verify component emits.

Test store state hydration.

Mock composables with proper typing.

Test error message displays.

Verify cleanup on unmount.

Run tests with `pnpm vitest run <filename>`.
