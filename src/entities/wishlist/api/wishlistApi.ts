import type { Product } from '@/entities/product/@x/wishlist'
import { baseApi, WISHLIST_TAG } from '@/shared/api'
import { mapWishlist } from '../lib/mapWishlist'
import type { WishlistDto } from './types'

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: build => ({
    wishlistProducts: build.query<Product[], void>({
      query: () => ({
        url: `/wishlist/products`,
      }),
      providesTags: [WISHLIST_TAG],
      transformResponse: (response: WishlistDto) => mapWishlist(response),
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
