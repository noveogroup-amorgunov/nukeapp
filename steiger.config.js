import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    ignores: [
      './src/app/apiMockWorker.ts',
      './src/app/storybookDecorators/*',
      '**/*.stories.tsx',
    ],
  },
  /**
   * Turn off insignificant slice for some entities and features,
   * which should be in global scope as application domain
   */
  {
    files: [
      './src/entities/user/**',
      './src/features/session/logout/**',
      './src/features/session/login/**',
    ],
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
  /**
   * Turn off no-reserved-folder-names for redux slice,
   * because steiger is not allowed slices in the shared layer
   */
  {
    files: [
      './src/shared/redux/**',
    ],
    rules: {
      'fsd/no-reserved-folder-names': 'off',
    },
  },
])
