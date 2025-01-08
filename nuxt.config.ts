// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-08',
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
})
