import type { QueryDefinition } from '@reduxjs/toolkit/query'
import { mapProduct } from '@/entities/product'
import type { Product } from '@/entities/product'
import { generatedApi } from '@/shared/api'
import type {
  ApiTagTypes,
  AppBaseQuery,
  GetPopularProductsApiArg,
  Product as ProductDto,
} from '@/shared/api'

/**
 * Client `Product` model (branded id, mapped fields) instead of raw DTO.
 * Single-slice endpoint: the adapter lives next to the only consumer.
 */
export const popularProductsApi = generatedApi.enhanceEndpoints<
  never,
  {
    getPopularProducts: QueryDefinition<
      GetPopularProductsApiArg,
      AppBaseQuery,
      ApiTagTypes,
      Product[],
      'api'
    >
  }
>({
  endpoints: {
    getPopularProducts: {
      transformResponse: response =>
        (response as ProductDto[]).map(mapProduct),
    },
  },
})

export const { useGetPopularProductsQuery } = popularProductsApi
