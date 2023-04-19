import { type WishlistDto } from './types'
import { mapWishlist } from '../lib/mapWishlist'
import type { Product } from '@/entities/product/model/types'
import { baseApi } from '@/shared/api/baseApi'
import { WISHLIST_TAG } from '@/shared/api/tags'

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
      }),
      invalidatesTags: [WISHLIST_TAG],
    }),
  }),
})

export const { useWishlistProductsQuery, useAddToWishlistMutation } =
  wishlistApi
