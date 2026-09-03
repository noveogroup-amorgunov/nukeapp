import type { Product } from '@/entities/product/@x/wishlist'
import { baseApi, WISHLIST_TAG } from '@/shared/api'
import { mapWishlist } from '../lib/mapWishlist'
import { wishlistDtoSchema } from './types'

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: build => ({
    wishlistProducts: build.query<Product[], void>({
      query: () => ({
        url: `/wishlist/products`,
      }),
      providesTags: [WISHLIST_TAG],
      /**
       * ✅ DX Best practice (Type safe)
       *
       * By default response is any (see BaseQueryResult)
       * Set response as unknown and validate it by zod schema
       *
       * @see node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes.d.ts
       */
      transformResponse: (response: unknown) =>
        mapWishlist(wishlistDtoSchema.parse(response)),
    }),
    addToWishlist: build.mutation<object, number[]>({
      query: productsInWishlistIds => ({
        url: `/wishlist/products`,
        method: 'PATCH',
        body: productsInWishlistIds,
        params: { delay: 500 },
      }),
      invalidatesTags: [WISHLIST_TAG],
    }),
  }),
})

export const { useWishlistProductsQuery, useAddToWishlistMutation }
  = wishlistApi
