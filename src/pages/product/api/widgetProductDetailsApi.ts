import type { ProductId } from '@/entities/product'
import { baseApi } from '@/shared/api'
import { mapProductDetails } from '../lib/mapProductDetails'
import type { ProductDetails } from '../model/types'
import { productDetailsDtoSchema } from './types'

export const productDetailsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    productDetails: build.query<ProductDetails, ProductId>({
      query: productId => ({
        url: `/products/${productId}`,
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
        mapProductDetails(productDetailsDtoSchema.parse(response)),
    }),
  }),
})

export const { useProductDetailsQuery } = productDetailsApi
