import type { QueryDefinition } from '@reduxjs/toolkit/query'
import { generatedApi } from '@/shared/api'
import type {
  ApiTagTypes,
  AppBaseQuery,
  GetProductDetailsApiArg,
  ProductDetails as ProductDetailsDto,
} from '@/shared/api'
import { mapProductDetails } from '../lib/mapProductDetails'
import type { ProductDetails } from '../model/types'

/**
 * Client `ProductDetails` model (branded id, mapped fields) instead of raw DTO
 * @see model/types.ts
 */
export const productDetailsApi = generatedApi.enhanceEndpoints<
  never,
  {
    getProductDetails: QueryDefinition<
      GetProductDetailsApiArg,
      AppBaseQuery,
      ApiTagTypes,
      ProductDetails,
      'api'
    >
  }
>({
  endpoints: {
    getProductDetails: {
      transformResponse: response =>
        mapProductDetails(response as ProductDetailsDto),
    },
  },
})

export const { useGetProductDetailsQuery } = productDetailsApi
