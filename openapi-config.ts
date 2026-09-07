import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: './src/shared/api/openapi.json',
  apiFile: './src/shared/api/baseApi.ts',
  apiImport: 'baseApi',
  outputFile: './src/shared/api/generated/api.generated.ts',
  exportName: 'generatedApi',
  hooks: true,
  tag: false,
  endpointOverrides: [
    { pattern: 'getCart', providesTags: ['cart'] },
    { pattern: 'updateCart', invalidatesTags: ['cart'] },
    { pattern: 'getWishlistProducts', providesTags: ['wishlist'] },
    { pattern: 'updateWishlistProducts', invalidatesTags: ['wishlist'] },
    { pattern: 'login', invalidatesTags: ['session', 'wishlist'] },
    { pattern: 'getMe', providesTags: ['user'] },
  ],
}

export default config
