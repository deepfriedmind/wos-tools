Always output the full code. Never do things like "// ...existing code..." or "your code here".

Always validate code syntax and nesting before suggesting changes.

Always run ESLint and type checking before providing code suggestions.

Use `<script setup lang="ts">` with `defineProps` and `defineEmits`.

Use destructuring syntax for props and emits with default values.

Use interfaces for props and emits with JSDoc comments.

Use `defineOptions({ inheritAttrs: false })`, `twMerge` and `v-bind="{ ...attributes, class: null }"` for components with default Tailwind classes.

Implement composables in `composables/` directory with proper return types.

Handle async data with `useAsyncData` and error handling.

Implement API routes with `defineEventHandler` and zod validation.

Type API responses with `ResT` generic in `useFetch`.

Store global state in Pinia using `defineStore` and `storeToRefs`.

Use `computed` for derived state in components and stores.

Implement middleware with `defineNuxtRouteMiddleware`.

Handle errors with `createError` and `<NuxtErrorBoundary>`.

Use `useHead` for dynamic meta updates.

Manage server state with `useState`.

Create reusable PrimeVue component compositions.

Use VueUse composables for common utilities.

Format dates with `dayjs` using typed methods.

Use `provide`/`inject` for dependency injection.

Use `watch` with immediate option when needed.

Create type-safe fetch composables.

Use named slots for component composition.

Implement store actions with proper typing.

Use `shallowRef` for large reactive objects.

Create reusable transition components.

Type component methods with `expose`.
