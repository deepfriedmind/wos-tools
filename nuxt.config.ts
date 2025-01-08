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
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxt/fonts',
    '@nuxt/icon',
  ],
  imports: {
    dirs: ['~/stores'],
    presets: [
      {
        from: 'tailwind-merge',
        imports: ['twJoin', 'twMerge'],
      },
    ],
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-01-08',
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
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
