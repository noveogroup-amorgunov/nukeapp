import { baseApi } from '@/shared/api'
import { mapProduct } from '../lib/mapProduct'
import { type Product, type ProductId } from '../model/types'
import { productDtoSchema, type ProductDto } from './types'

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    popularProducts: build.query<Product[], void>({
      query: () => ({
        url: `/products/popular`,
      }),
      /**
       * ✅ DX Best practice (Type safe)
       *
       * By default response is any (see BaseQueryResult)
       * Set response as unknown and validate it by zod schema
       *
       * @see node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes.d.ts
       */
      transformResponse: (response: unknown) =>
        productDtoSchema.array().parse(response).map(mapProduct),
    }),
    products: build.query<Product[], ProductId[]>({
      query: (productIds?: ProductId[]) => ({
        url: `/products${
          productIds && productIds.length > 0
            ? `?${productIds.map((id) => `id=${id}`).join('&')}`
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
