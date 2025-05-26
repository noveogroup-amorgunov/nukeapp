import type { ProductId } from '@/entities/product'
import { baseApi } from '@/shared/api'
import { mapProductDetails } from '../lib/mapProductDetails'
import type { ProductDetails } from '../model/types'
import type { ProductDetailsDto } from './types'

export const productDetailsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    productDetails: build.query<ProductDetails, ProductId>({
      query: productId => ({
        url: `/products/${productId}`,
      }),
      transformResponse: (response: ProductDetailsDto) =>
        mapProductDetails(response),
    }),
  }),
})

export const { useProductDetailsQuery } = productDetailsApi
