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
  /**
   * Infrastructural slices in the shared layer (see docs/changes/
   * refactor-layout-to-shared-ui): same as shared/redux, steiger does not
   * model slices inside shared, so segment naming/public API rules are
   * relaxed for them.
   */
  {
    files: [
      './src/shared/services/**',
    ],
    rules: {
      'fsd/no-reserved-folder-names': 'off',
      'fsd/segments-by-purpose': 'off',
    },
  },
  /**
   * App providers compose smart parts (layout provider with header right
   * slot internals), steiger does not model this app-level grouping.
   */
  {
    files: [
      './src/app/providers/**',
    ],
    rules: {
      'fsd/no-reserved-folder-names': 'off',
      'fsd/segments-by-purpose': 'off',
    },
  },
])
