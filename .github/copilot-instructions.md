Always output the full code. Never do things like "// ...existing code..." or "your code here".

Always validate code syntax and nesting before suggesting changes.

Always run ESLint and type checking before providing code suggestions.

Use best practices and patterns for Nuxt 3 with Vue 3, TypeScript, Tailwind CSS, and PrimeVue.

Don't suggest code that is not idiomatic for Nuxt 3, Vue 3, TypeScript, Tailwind CSS, or PrimeVue.

Don't add imports for anything that is auto-imported via Nuxt, e.g. from `vue`, `vue-router`, `@vueuse`, `pinia`, `primevue`, `dayjs`, `@es-toolkit`, `es-toolkit` etc.

Use `<script setup lang="ts">` for single-file components.

Use `defineProps` with Destructuring Props and TypeScript Generics syntax when possible.

Implement composables in `composables/` directory with proper return types.

Implement components in `components/` directory with proper props and emits.

Implement layouts in `layouts/` directory with proper slots.

Implement pages in `pages/` directory with proper routing.

Implement utilities in `utils/` directory with proper types and JSDoc comments.

Handle async data with `useAsyncData` and error handling.

Implement API routes with `defineEventHandler` and zod validation.

Type API responses with `ResT` generic in `useFetch`.

Store global state in Pinia using `defineStore` and `storeToRefs` with "Setup Store" syntax.

Use `computed` for derived state in components and stores.

Implement middleware with `defineNuxtRouteMiddleware`.

Handle errors with `createError` and `<NuxtErrorBoundary>`.

Use `useHead` for dynamic meta updates.

Manage server state with `useState`.

Create reusable PrimeVue component compositions.

Use Day.js via the `useDayjs` composable for everything date- and time-related.

Use VueUse composables for common utilities.

Use `provide`/`inject` for dependency injection.

Use `watch` with immediate option when needed.

Create type-safe fetch composables.

Use named slots for component composition.

Implement store actions with proper typing.

Use `shallowRef` for large reactive objects.

Create reusable transition components.

Type component methods with `expose`.

Run tests with `pnpm vitest run <filename>`.
