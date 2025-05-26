import type { ProductDto } from '@/shared/api'
import { baseApi, mapProduct } from '@/shared/api'
import type { EntitiesDomain } from '@/shared/domain'

export const productPopularListApi = baseApi.injectEndpoints({
  endpoints: build => ({
    popularProducts: build.query<EntitiesDomain['Product'][], void>({
      query: () => ({
        url: `/products/popular`,
      }),
      transformResponse: (response: ProductDto[]) => response.map(mapProduct),
    }),
  }),
})

export const { usePopularProductsQuery } = productPopularListApi
