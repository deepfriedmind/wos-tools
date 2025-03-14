import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const ThemeConfiguration = definePreset(Aura, {
  components: {
    toast: {
      colorScheme: {
        dark: {
          blur: '16px',
          error: {
            background: 'color-mix(in srgb, {red.900}, transparent 20%)',
          },
          info: {
            background: 'color-mix(in srgb, {blue.900}, transparent 20%)',
          },
          success: {
            background: 'color-mix(in srgb, {green.900}, transparent 20%)',
          },
          warn: {
            background: 'color-mix(in srgb, {yellow.700}, transparent 20%)',
          },
        },
      },
    },
  },
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
}) as Record<string, unknown>

export default {
  directives: {
    prefix: 'p',
  },
  options: {
    pt: {
      toast: {
        root: {
          style: 'max-width: calc(100vw - 2.5rem)',
        },
      },
    },
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
}
