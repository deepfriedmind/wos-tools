import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
// @ts-expect-error no declared types at this time
import primeui from 'tailwindcss-primeui'

export default <Partial<Config>>{
  content: [
    './index.html',
    './src/**/*.vue',
  ],
  darkMode: 'selector',
  plugins: [
    primeui,
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
        '2xl': '5rem',
        DEFAULT: '1rem',
        lg: '3rem',
        md: '2.5rem',
        sm: '2rem',
        xl: '4rem',
      },
    },
    extend: {
      fontFamily: {
        logo: ['Atma', ...defaultTheme.fontFamily.sans],
        mono: ['"Space Mono"', ...defaultTheme.fontFamily.mono],
        sans: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
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
