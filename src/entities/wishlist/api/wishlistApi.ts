import type { Product } from '@/entities/product/@x/wishlist'
import { baseApi, WISHLIST_TAG } from '@/shared/api'
import { mapWishlist } from '../lib/mapWishlist'
import { type WishlistDto } from './types'

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    wishlistProducts: build.query<Product[], void>({
      query: () => ({
        url: `/products/wishlist`,
      }),
      providesTags: [WISHLIST_TAG],
      transformResponse: (response: WishlistDto) => mapWishlist(response),
    }),
    addToWishlist: build.mutation<{}, number[]>({
      query: (productsInWishlistIds) => ({
        url: `/products/wishlist`,
        method: 'PATCH',
        body: productsInWishlistIds,
        params: { delay: 500 },
      }),
      invalidatesTags: [WISHLIST_TAG],
    }),
  }),
})

export const { useWishlistProductsQuery, useAddToWishlistMutation } =
  wishlistApi
