import { type CategoryDto, type CategoryWithProductsDto } from './types'
import { mapCategory } from '../lib/mapCategory'
import { mapCategoryWithProducts } from '../lib/mapCategoryWithProducts'
import { type Category, type CategoryWithProducts } from '../model/types'
import { baseApi } from '@/shared/api/baseApi'

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    popularCategories: build.query<Category[], void>({
      query: () => ({
        url: `/categories/popular`,
      }),
      transformResponse: (response: CategoryDto[]) => response.map(mapCategory),
    }),
    categoryDetails: build.query<CategoryWithProducts, number>({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
      }),
      transformResponse: (response: CategoryWithProductsDto) =>
        mapCategoryWithProducts(response),
    }),
  }),
})

export const { usePopularCategoriesQuery, useCategoryDetailsQuery } =
  categoryApi
