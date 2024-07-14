import antfu from '@antfu/eslint-config'
import { fixupPluginRules } from '@eslint/compat'
import eslintPluginReact from '@eslint-react/eslint-plugin'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'

export default antfu(
  {
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },

  },
  {
    plugins: {
      'react': eslintPluginReact,
      // @see https://github.com/facebook/react/issues/28313#issuecomment-2180984628
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
    },
  },
  // Common rules
  {
    rules: {
      'ts/no-explicit-any': 'error',
      'ts/consistent-type-definitions': ['error', 'type'],
      'import/no-default-export': 'error',
    },
  },
  // Feature-Sliced Design rules
  {
    rules: {
      // disallow import @/shared/lib/server
      'no-restricted-imports': ['error', {
        paths: [{
          name: '@/shared/lib/server',
          message: 'Not allowed use server modules in client',
        }],
      }],
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'pathGroups': [{
          pattern: 'react',
          group: 'external',
          position: 'before',
        }, {
          pattern: '*.css',
          group: 'index',
          patternOptions: {
            matchBase: true,
          },
          position: 'after',
        }, {
          pattern: '@/**',
          group: 'external',
          position: 'after',
        }],
        // "pathGroupsExcludedImportTypes": ["react"],
        'newlines-between': 'never',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      }],
    },
    // TODO: Turn on
    // feature-sliced/layers-slices
    // 'boundaries/element-types': 'error',

    // TODO: Turn on
    // feature-sliced/public-api
    // "import/no-internal-modules": "warn" // ~ 1,
  },
  {
    files: [
      '**/*.stories.tsx',
      'vite.config.mts',
      'eslint.config.mjs',
      'public/mockServiceWorker.js',
    ],
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-default-export': 'off',
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['**/__mocks__/**/*.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
)
