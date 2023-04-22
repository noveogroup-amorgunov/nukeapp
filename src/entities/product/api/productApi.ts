import { baseApi } from '@/shared/api/baseApi'
import { mapProduct } from '../lib/mapProduct'
import { type Product, type ProductId } from '../model/types'
import { type ProductDto } from './types'

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    popularProducts: build.query<Product[], void>({
      query: () => ({
        url: `/products/popular`,
      }),
      transformResponse: (response: ProductDto[]) => response.map(mapProduct),
    }),
    products: build.query<Product[], ProductId[]>({
      query: (productIds?: ProductId[]) => ({
        url: `/products${
          productIds
            ? `?${
                productIds.length === 0
                  ? `id=-1`
                  : productIds.map((id) => `id=${id}`).join('&')
              }`
            : ''
        }`,
      }),
      transformResponse: (response: ProductDto[]) => response.map(mapProduct),
    }),
    productDetails: build.query<Product, ProductId>({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
      transformResponse: (response: ProductDto) => mapProduct(response),
    }),
  }),
})

export const {
  useProductsQuery,
  usePopularProductsQuery,
  useLazyProductDetailsQuery,
} = productApi
