import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const ThemeConfiguration = definePreset(Aura, {
  semantic: {
    colorScheme: {
      dark: {
        surface: {
          0: '#ffffff',
          50: '#f7faff',
          100: '#d8e9ff',
          200: '#b9d7ff',
          300: '#9ac6ff',
          400: '#7bb4ff',
          500: '#5ca3ff',
          600: '#4e8bd9',
          700: '#4072b3',
          800: '#335a8c',
          900: '#254166',
          950: '#172940',
        },
      },
    },
    primary: {
      50: '#f9fbff',
      100: '#e0edfe',
      200: '#c8e0fd',
      300: '#afd2fd',
      400: '#97c4fc',
      500: '#7eb6fb',
      600: '#6b9bd5',
      700: '#587fb0',
      800: '#45648a',
      900: '#324964',
      950: '#202e3f',
    },
    overlay: {
      modal: {
        padding: '2rem',
      },
    },
  },
}) as Record<string, unknown>

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/test-utils/module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  imports: {
    dirs: ['~/stores'],
    presets: [
      {
        from: 'tailwind-merge',
        imports: ['twJoin', 'twMerge'],
      },
      {
        from: '@vueuse/integrations/useChangeCase',
        imports: ['useChangeCase'],
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
  runtimeConfig: {
    public: {
      storagePrefix: 'wos-tools_',
    },
  },
  compatibilityDate: '2025-01-08',
  nitro: {
    runtimeConfig: {
      public: {
        buildTime: '',
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  hooks: {
    'nitro:build:before': (nitro) => {
      nitro.options.runtimeConfig.public.buildTime = new Date().toISOString()
    },
  },
  dayjs: {
    plugins: ['utc', 'duration', 'localizedFormat'],
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700],
    },
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
  piniaPluginPersistedstate: {
    key: 'wos-tools_%id',
    storage: 'localStorage',
  },
  primevue: {
    options: {
      ripple: true,
      theme: {
        options: {
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities',
          },
          darkModeSelector: '.dark',
        },
        preset: ThemeConfiguration,
      },
    },
  },
  tailwindcss: {
    exposeConfig: true,
  },
})
