import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
import primeui from 'tailwindcss-primeui'

export default <Partial<Config>>{
  content: [
    './index.html',
    './src/**/*.vue',
  ],
  darkMode: 'selector',
  plugins: [
    primeui,
    // eslint-disable-next-line ts/unbound-method
    plugin(({ addUtilities, addVariant, theme }) => {
      addUtilities({
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

  safelist: ['text-red-500', 'text-yellow-500', 'text-gray-300'],
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
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
      fontFamily: {
        logo: ['Atma', ...defaultTheme.fontFamily.sans],
        mono: ['"Space Mono"', ...defaultTheme.fontFamily.mono],
        sans: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
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
