import type { QueryDefinition } from '@reduxjs/toolkit/query'
import { generatedApi } from '@/shared/api'
import type {
  ApiTagTypes,
  AppBaseQuery,
  GetProductsApiArg,
  Product as ProductDto,
} from '@/shared/api'
import { mapProduct } from '../lib/mapProduct'
import type { Product } from '../model/types'

/**
 * Client `Product` model (branded id, mapped fields) instead of raw DTO
 * @see model/types.ts
 */
export const productApi = generatedApi.enhanceEndpoints<
  never,
  {
    getProducts: QueryDefinition<
      GetProductsApiArg,
      AppBaseQuery,
      ApiTagTypes,
      Product[],
      'api'
    >
  }
>({
  endpoints: {
    getProducts: {
      transformResponse: response => (response as ProductDto[]).map(mapProduct),
    },
  },
})

export const { useGetProductsQuery } = productApi
