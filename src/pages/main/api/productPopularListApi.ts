import { mapProduct, productDtoSchema } from '@/entities/product'
import type { Product } from '@/entities/product'
import { baseApi } from '@/shared/api'

export const productPopularListApi = baseApi.injectEndpoints({
  endpoints: build => ({
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
  }),
})

export const { usePopularProductsQuery } = productPopularListApi
