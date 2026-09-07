import type { QueryDefinition } from '@reduxjs/toolkit/query'
import type { Product } from '@/entities/product/@x/wishlist'
import { generatedApi } from '@/shared/api'
import type {
  ApiTagTypes,
  AppBaseQuery,
  GetWishlistProductsApiArg,
  Product as ProductDto,
} from '@/shared/api'
import { mapWishlist } from '../lib/mapWishlist'

/**
 * Client `Product` model inside wishlist (branded id, mapped fields) instead of raw DTO
 */
export const wishlistApi = generatedApi.enhanceEndpoints<
  never,
  {
    getWishlistProducts: QueryDefinition<
      GetWishlistProductsApiArg,
      AppBaseQuery,
      ApiTagTypes,
      Product[],
      'api'
    >
  }
>({
  endpoints: {
    getWishlistProducts: {
      transformResponse: response => mapWishlist(response as ProductDto[]),
    },
  },
})

export const { useGetWishlistProductsQuery } = wishlistApi
