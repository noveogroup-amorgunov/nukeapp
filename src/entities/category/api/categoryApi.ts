import type { QueryDefinition } from '@reduxjs/toolkit/query'
import { generatedApi } from '@/shared/api'
import type {
  ApiTagTypes,
  AppBaseQuery,
  Category as CategoryDto,
  CategoryWithProducts as CategoryWithProductsDto,
  GetCategoryDetailsApiArg,
  GetPopularCategoriesApiArg,
} from '@/shared/api'
import { mapCategory } from '../lib/mapCategory'
import { mapCategoryWithProducts } from '../lib/mapCategoryWithProducts'
import type { Category, CategoryWithProducts } from '../model/types'

/**
 * Client `Category` models (branded id, mapped fields) instead of raw DTO
 * @see model/types.ts
 */
export const categoryApi = generatedApi.enhanceEndpoints<
  never,
  {
    getPopularCategories: QueryDefinition<
      GetPopularCategoriesApiArg,
      AppBaseQuery,
      ApiTagTypes,
      Category[],
      'api'
    >
    getCategoryDetails: QueryDefinition<
      GetCategoryDetailsApiArg,
      AppBaseQuery,
      ApiTagTypes,
      CategoryWithProducts,
      'api'
    >
  }
>({
  endpoints: {
    getPopularCategories: {
      transformResponse: response =>
        (response as CategoryDto[]).map(mapCategory),
    },
    getCategoryDetails: {
      transformResponse: response =>
        mapCategoryWithProducts(response as CategoryWithProductsDto),
    },
  },
})

export const { useGetCategoryDetailsQuery, useGetPopularCategoriesQuery }
  = categoryApi
