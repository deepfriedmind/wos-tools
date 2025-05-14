import typographyPlugin from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
import PrimeUI from 'tailwindcss-primeui'

export default <Partial<Config>>{
  content: [
    './index.html',
    './src/**/*.vue',
  ],
  darkMode: 'selector',
  plugins: [
    PrimeUI,
    typographyPlugin,
    // eslint-disable-next-line ts/unbound-method
    plugin(({ addUtilities, addVariant, theme }) => {
      addUtilities({
        '.content-auto': {
          contentVisibility: 'auto',
        },
        '.hitbox-50': {
          '&::after': {
            bottom: '-25%',
            content: '\'\'',
            display: 'block',
            left: '-25%',
            position: 'absolute',
            right: '-25%',
            top: '-25%',
          },
          position: 'relative',
        },
        '.hitbox-100': {
          '&::after': {
            bottom: '-50%',
            content: '\'\'',
            display: 'block',
            left: '-50%',
            position: 'absolute',
            right: '-50%',
            top: '-50%',
          },
          position: 'relative',
        },
        '.leading-0': {
          lineHeight: '0',
        },
        '.py-container': {
          /* eslint-disable perfectionist/sort-objects */
          paddingBottom: theme('container.padding.DEFAULT'),
          paddingTop: theme('container.padding.DEFAULT'),
          '@screen sm': {
            paddingBottom: theme('container.padding.sm'),
            paddingTop: theme('container.padding.sm'),
          },
          '@screen md': {
            paddingBottom: theme('container.padding.md'),
            paddingTop: theme('container.padding.md'),
          },
          '@screen lg': {
            paddingBottom: theme('container.padding.lg'),
            paddingTop: theme('container.padding.lg'),
          },
          '@screen xl': {
            paddingBottom: theme('container.padding.xl'),
            paddingTop: theme('container.padding.xl'),
          },
          /* eslint-enable perfectionist/sort-objects */
        },
        '.text-shadow': {
          textShadow: '0.0333em 0.033em 0 rgb(36 65 102 / 90%)',
        },
      })
      addVariant('link-active', [
        '&.router-link-active',
        '.router-link-active &',
      ])
      addVariant('link-exact-active', [
        '&.router-link-exact-active',
        '.router-link-exact-active &',
      ])
      addVariant('not-disabled', '&:not(:disabled)')
      addVariant('path', '& path')
    }),
  ],

  safelist: [
    // Text colors
    'text-red-500',
    'text-yellow-500',
    'text-gray-300',

    // Gradient directions
    'bg-gradient-to-b',
    'bg-gradient-to-bl',
    'bg-gradient-to-br',
    'bg-gradient-to-l',
    'bg-gradient-to-r',
    'bg-gradient-to-t',
    'bg-gradient-to-tl',
    'bg-gradient-to-tr',

    // Amber colors for from/via/to
    'from-amber-100',
    'from-amber-200',
    'from-amber-300',
    'from-amber-400',
    'from-amber-500',
    'via-amber-100',
    'via-amber-200',
    'via-amber-300',
    'via-amber-400',
    'via-amber-500',
    'to-amber-100',
    'to-amber-200',
    'to-amber-300',
    'to-amber-400',
    'to-amber-500',

    // Percentage values for gradient stops
    'from-30%',
    'from-35%',
    'from-40%',
    'from-45%',
    'from-50%',
    'from-55%',
    'from-60%',
    'via-30%',
    'via-35%',
    'via-40%',
    'via-45%',
    'via-50%',
    'via-55%',
    'via-60%',
    'to-50%',
    'to-55%',
    'to-60%',
    'to-65%',
    'to-70%',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        /* eslint-disable perfectionist/sort-objects */
        DEFAULT: '1rem',
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
        /* eslint-enable perfectionist/sort-objects */
      },
    },
    extend: {
      animation: {
        gradient: 'gradient 10s cubic-bezier(0.65, 0.05, 0.36, 1) infinite alternate', // In/Out Cubic
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
      fontFamily: {
        logo: ['Atma', ...defaultTheme.fontFamily.sans],
        mono: ['"Space Mono"', ...defaultTheme.fontFamily.mono],
        sans: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        gradient: {
          from: { backgroundPosition: '50% 0%' },
          to: { backgroundPosition: '50% 100%' },
        },
        shake: {
          '10%, 90%': {
            transform: 'scale(1.1) translate3d(-1px, 0, 0)',
          },
          '20%, 80%': {
            transform: 'scale(1.1) translate3d(2px, 0, 0)',
          },
          '30%, 50%, 70%': {
            transform: 'scale(1.1) translate3d(-4px, 0, 0)',
          },
          '40%, 60%': {
            transform: 'scale(1.1) translate3d(4px, 0, 0)',
          },
        },
      },
      transitionTimingFunction: {
        'out-back': 'cubic-bezier(.34,1.56,.64,1)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'white',
            '--tw-prose-bold': 'white',
            '--tw-prose-bullets': '#c0c0c0',
            '--tw-prose-captions': '#c0c0c0',
            '--tw-prose-code': 'white',
            '--tw-prose-counters': '#c0c0c0',
            '--tw-prose-headings': 'white',
            '--tw-prose-hr': '#c0c0c0',
            '--tw-prose-lead': 'white',
            '--tw-prose-quotes': 'white',
            '--tw-prose-td-borders': '#c0c0c0',
            '--tw-prose-th-borders': '#c0c0c0',
          },
        },
      },
    },
    fontWeight: {
      /* eslint-disable perfectionist/sort-objects */
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      /* eslint-enable perfectionist/sort-objects */
    },
  },
}
