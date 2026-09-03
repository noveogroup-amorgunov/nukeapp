import { baseApi } from '@/shared/api'
import { mapCategory } from '../lib/mapCategory'
import { mapCategoryWithProducts } from '../lib/mapCategoryWithProducts'
import type { Category, CategoryWithProducts } from '../model/types'
import type {
  CategoryDetailsRequestArgs,
} from './types'
import { categoryDtoSchema, categoryWithProductsDtoSchema } from './types'

export const categoryApi = baseApi.injectEndpoints({
  endpoints: build => ({
    popularCategories: build.query<Category[], void>({
      query: () => ({
        url: `/categories/popular`,
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
        categoryDtoSchema.array().parse(response).map(mapCategory),
    }),
    categoryDetails: build.query<
      CategoryWithProducts,
      CategoryDetailsRequestArgs
    >({
      query: ({ sortBy, categoryId }) => ({
        url: `/categories/${categoryId}`,
        params: { sortBy, delay: 400 },
      }),
      transformResponse: (response: unknown) =>
        mapCategoryWithProducts(categoryWithProductsDtoSchema.parse(response)),
    }),
  }),
})

export const { usePopularCategoriesQuery, useCategoryDetailsQuery }
  = categoryApi
