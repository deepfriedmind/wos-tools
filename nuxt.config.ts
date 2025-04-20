import process from 'node:process'

import primevue from './primevue.config'
import rem from './utils/rem'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@formkit/auto-animate/nuxt',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/test-utils/module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@selemondev/nuxt-es-tool-kit',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    'floating-vue/nuxt',
    'nuxt-gtag',
    'nuxt-og-image',
    'pinia-plugin-persistedstate/nuxt',
  ],
  imports: {
    dirs: ['constants', 'stores', 'utils/**'],
    presets: [
      {
        from: 'tailwind-merge',
        imports: ['twJoin', 'twMerge'],
      },
    ],
  },
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'WoS Tools' },
      ],
    },
  },
  css: [
    'primeicons/primeicons.css',
  ],
  site: {
    url: 'https://wostools.netlify.app',
    name: 'WoS Tools❄️',
  },
  runtimeConfig: {
    public: {
      storagePrefix: 'wos-tools_',
    },
  },
  watch: ['primevue.config.ts'],
  compatibilityDate: '2025-02-22',
  nitro: {
    runtimeConfig: {
      public: {
        buildTime: '',
      },
    },
  },
  postcss: {
    plugins: {
      'postcss-functions': {
        functions: { rem },
      },
    },
  },
  hooks: {
    'nitro:build:before': (nitro) => {
      nitro.options.runtimeConfig.public.buildTime = new Date().toISOString()
    },
  },
  dayjs: {
    plugins: ['duration', 'isSameOrAfter', 'relativeTime', 'utc'],
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  esToolkit: {
    prefix: 'use',
    alias: [
      ['head', 'headArray'],
      ['memoize', 'memoizeEs'],
    ],
    utilities: ['math', 'predicate', 'string', 'util', 'object', 'function', 'array'],
  },
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700],
    },
  },
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: 'G-RD52R1SFDV',
  },
  icon: {
    serverBundle: {
      externalizeIconsJson: true,
    },
    clientBundle: {
      icons: [
        'fluent-emoji:snowflake',
      ],
      scan: true,
    },
  },
  ogImage: {
    fonts: ['Space+Grotesk:400', 'Space+Grotesk:700'],
    defaults: {
      emojis: 'fluent-emoji',
    },
  },
  piniaPluginPersistedstate: {
    key: 'wos-tools_%id',
    storage: 'localStorage',
  },
  primevue,
  tailwindcss: {
    exposeConfig: true,
    config: {
      content: ['./pages/**/*.{vue,js,ts}', './components/**/*.{vue,js,ts}'],
    },
  },
})
