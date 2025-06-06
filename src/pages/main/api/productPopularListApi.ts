import { mapProduct } from '@/entities/product'
import type { Product, ProductDto } from '@/entities/product'
import { baseApi } from '@/shared/api'

export const productPopularListApi = baseApi.injectEndpoints({
  endpoints: build => ({
    popularProducts: build.query<Product[], void>({
      query: () => ({
        url: `/products/popular`,
      }),
      transformResponse: (response: ProductDto[]) => response.map(mapProduct),
    }),
  }),
})

export const { usePopularProductsQuery } = productPopularListApi
