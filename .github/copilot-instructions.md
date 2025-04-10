Always output the full code. Never do things like "// ...existing code..." or "your code here".

Always validate code syntax and nesting before suggesting changes.

Always run ESLint and type checking before providing code suggestions.

Do NOT use abbreviations or acronyms for variable names. Make them clear and descriptive without being overly verbose.

Use best practices and patterns for Nuxt 3 with Vue 3, TypeScript, Tailwind CSS 3, and PrimeVue 4.

Do NOT add imports for anything that is auto-imported via Nuxt, e.g. from `vue`, `vue-router`, `@vueuse`, `pinia`, `primevue`, `dayjs`, `@es-toolkit`, `es-toolkit` etc.

Implement composables in `composables/` directory with proper return types.

Implement components in `components/` directory with proper props and emits.

Implement layouts in `layouts/` directory with proper slots.

Implement pages in `pages/` directory with proper routing.

Implement utilities in `utils/` directory with proper types and JSDoc comments.

Use `<script setup lang="ts">` for single-file components.

Always prefer destructuring whenever possible.

Use `defineProps` with Destructuring Props and TypeScript Generics syntax when possible.

Use `useTemplateRef` for template refs. They do not need to be typed.

Use `shallowRef` instead of `ref` whenever possible.

Do NOT use `shallowRef` for template refs.

Always prefer `undefined` over `null` for uninitialized values.

Do NOT use the `any` type. Always use specific types.

Handle async data with `useAsyncData` and error handling.

Implement API routes with `defineEventHandler` and zod validation.

Type API responses with `ResT` generic in `useFetch`.

Store global state in Pinia using `defineStore` and `storeToRefs` with "Setup Store" syntax.

Use `computed` for derived state in components and stores.

Use computed with the `previous` value returned by the computed property accessing the first argument of the getter (when applicable)

Implement middleware with `defineNuxtRouteMiddleware`.

Handle errors with `createError` and `<NuxtErrorBoundary>`.

Use `useHead` for dynamic meta updates.

Manage server state with `useState`.

Create reusable PrimeVue component compositions.

Use Day.js via the `useDayjs` composable for everything date- and time-related.

Use VueUse and es-toolkit for common utilities.

Use `provide`/`inject` for dependency injection.

Use `watch` with immediate option when needed.

Create type-safe fetch composables.

Use named slots for component composition.

Implement store actions with proper typing.

Create reusable transition components.

Type component methods with `expose`.

Do NOT use `<style>` blocks unless necessary, always prefer Tailwind CSS classes.

After editing files, always check for problems (linting, type errors, etc.) and fix them. **Crucially, continue checking and fixing recursively until NO problems remain.** A task is not complete if any problems are reported after a change.

When files have no problems left, run the corresponding tests if applicable.

Run tests with `pnpm vitest run <filename>`.

**Strictly forbid comments explaining refactoring steps or code movement.** Comments like `// Changed from`, `// Updated to`, `// Logic moved to X`, or `// Y is now handled by Z` are unnecessary noise and must not be included in the final code. Focus on code quality and self-documentation. Comments should only explain _why_ a complex or non-obvious piece of code exists, not _how_ it got there.

Do NOT add verbose comments or explanations in the code. The code should be self-explanatory and easy to understand without excessive comments.

Use JSDoc comments for complex functions and public APIs.
