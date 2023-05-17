import { baseApi } from '@/shared/api'
import { mapProduct } from '../lib/mapProduct'
import { mapProductDetails } from '../lib/mapProductDetails'
import {
  type Product,
  type ProductDetails,
  type ProductId,
} from '../model/types'
import { type ProductDto, type ProductDetailsDto } from './types'

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    popularProducts: build.query<Product[], void>({
      query: () => ({
        url: `/products/popular`,
      }),
      transformResponse: (response: ProductDto[]) => response.map(mapProduct),
    }),
    productDetails: build.query<ProductDetails, ProductId>({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
      transformResponse: (response: ProductDetailsDto) =>
        mapProductDetails(response),
    }),
  }),
})

export const { usePopularProductsQuery, useProductDetailsQuery } = productApi
