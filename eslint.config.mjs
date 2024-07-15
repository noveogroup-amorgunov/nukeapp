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
      'no-restricted-syntax': ['error', {
        selector: 'MemberExpression[object.meta.name=\'import\'][object.property.name=\'meta\'][property.name=\'env\']',
        message: 'The use of import.meta.env is not allowed. Use import { env } from \'@/shared/lib\'',
      }],
      'no-restricted-imports': ['error', {
        paths: [
          {
            name: '@/shared/lib/server',
            message: 'Don\'t use server modules in client code',
          },
          {
            name: 'react-router-dom',
            importNames: ['useParams'],
            message: 'Use `useTypedParams` from `@/shared/lib/useTypedParams` instead.',
          },
        ],
      }],
    },
  },
  // Feature-Sliced Design rules
  {
    rules: {
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
