// @ts-check
import antfu from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'
import tailwind from 'eslint-plugin-tailwindcss'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
    stylistic: true,
    typescript: {
      overrides: {
        'ts/prefer-destructuring': [
          'error',
          {
            AssignmentExpression: {
              array: true,
              object: false,
            },
            VariableDeclarator: {
              array: true,
              object: true,
            },
          },
          {
            enforceForRenamedProperties: false,
          },
        ],
      },
      parserOptions: {
        projectService: true,
      },
      tsconfigPath: 'tsconfig.json',
    },
    unicorn: {
      allRecommended: true,
    },
    vue: true,
  })
    .renamePlugins({
      style: '@stylistic',
    }),
  ...tailwind.configs['flat/recommended'],
  {
    name: 'project/global',
    rules: {
      ...perfectionist.configs['recommended-natural'].rules,
      '@stylistic/operator-linebreak': ['error', 'before', { overrides: { '?': 'after' } }], // equivalent to Prettier's `experimentalTernaries` option
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'block-like', prev: 'expression' },
        { blankLine: 'always', next: 'block-like', prev: 'function' },
        { blankLine: 'always', next: 'block-like', prev: 'if' },
        { blankLine: 'always', next: 'block-like', prev: 'switch' },
        { blankLine: 'always', next: 'const', prev: 'block-like' },
        { blankLine: 'always', next: 'export', prev: '*' },
        { blankLine: 'any', next: 'export', prev: 'export' },
        { blankLine: 'always', next: 'expression', prev: 'block-like' },
        { blankLine: 'always', next: 'expression', prev: 'multiline-const' },
        { blankLine: 'always', next: 'function', prev: 'block-like' },
        { blankLine: 'always', next: 'function', prev: 'const' },
        { blankLine: 'always', next: 'if', prev: 'block-like' },
        { blankLine: 'always', next: 'if', prev: 'multiline-const' },
        { blankLine: 'always', next: 'let', prev: 'block-like' },
        { blankLine: 'always', next: 'multiline-const', prev: 'expression' },
        { blankLine: 'always', next: 'multiline-const', prev: 'if' },
        { blankLine: 'always', next: 'multiline-const', prev: 'multiline-const' },
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: 'switch', prev: '*' },
      ],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
      'arrow-body-style': 'error',
      'import/order': [
        'warn',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
            orderImportKind: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
      'no-console': 'off',
      'no-lonely-if': 'error',
      'no-useless-concat': 'error',
      'perfectionist/sort-imports': 'off',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [String.raw`^README\.md$`],
        },
      ],
      'unicorn/prevent-abbreviations': ['error', { allowList: {
        props: true,
        Props: true,
        ref: true,
        Ref: true,
      }, checkFilenames: false }],
    },
  },
  {
    files: ['**/*.vue'],
    name: 'project/vue',
    rules: {
      'tailwindcss/classnames-order': ['error', {
        callees: ['tw', 'twMerge', 'twJoin'],
        tags: ['tw'],
      }],
      'tailwindcss/no-custom-classname': [
        'error',
        {
          callees: ['tw', 'twMerge', 'twJoin'],
          tags: ['tw', 'twMerge', 'twJoin'],
          whitelist: ['dark', 'pi', 'pi?-[a-z-]+'],
        },
      ],
      'vue/camelcase': 'error',
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'beside',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          multiline: 1,
          singleline: 1,
        },
      ],
      'vue/no-multiple-template-root': 'off',
    },
  },
  {
    files: ['components/**/*'],
    name: 'project/components',
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'pascalCase',
        },
      ],
    },
  },
  {
    files: ['utils/**/*', 'composables/**/*'],
    name: 'project/misc',
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'camelCase',
        },
      ],
    },
  },
  {
    files: ['nuxt.config.ts'],
    name: 'project/nuxtconfig',
    rules: {
      'perfectionist/sort-objects': 'off',
    },
  },
  {
    files: ['**/*.md'],
    name: 'project/markdown',
    rules: {
      '@stylistic/no-trailing-spaces': 'off',
    },
  },
  {
    files: ['package.json'],
    name: 'project/packagejson',
    rules: { 'jsonc/sort-keys': 'off' },
  },
)
