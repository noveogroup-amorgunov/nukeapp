import type { ConfigFile } from '@rtk-query/codegen-openapi'

/**
 * Tag strings must match the values of `src/shared/api/tags.ts`:
 * the generated endpoints hang tags on the existing `baseApi` tagTypes.
 */
const config: ConfigFile = {
  schemaFile: './src/shared/api/openapi.json',
  apiFile: './src/shared/api/baseApi.ts',
  apiImport: 'baseApi',
  outputFile: './src/shared/api/generated/api.generated.ts',
  exportName: 'generatedApi',
  hooks: true,
  tag: false,
  endpointOverrides: [
    { pattern: 'getCart', providesTags: ['CART_TAG'] },
    { pattern: 'updateCart', invalidatesTags: ['CART_TAG'] },
    { pattern: 'getWishlistProducts', providesTags: ['WISHLIST_TAG'] },
    { pattern: 'updateWishlistProducts', invalidatesTags: ['WISHLIST_TAG'] },
    { pattern: 'login', invalidatesTags: ['SESSION_TAG', 'WISHLIST_TAG'] },
    { pattern: 'getMe', providesTags: ['USER_TAG'] },
  ],
}

export default config
