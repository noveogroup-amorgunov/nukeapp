import { WISHLIST_TAG, baseApi } from '@/shared/api'
import type { EntitiesDomain } from '@/shared/domain'
import { mapWishlist } from '../lib/mapWishlist'
import type { WishlistDto } from './types'

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: build => ({
    wishlistProducts: build.query<EntitiesDomain['Product'][], void>({
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
