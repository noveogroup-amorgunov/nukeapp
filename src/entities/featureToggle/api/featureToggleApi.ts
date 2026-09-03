import { baseApi } from '@/shared/api'
import { getQueryParams } from '@/shared/lib/router'
import { mapFeatureToggle } from '../lib/mapFeatureToggle'
import type { FeatureToggle } from '../model/types'
import { featureToggleDtoSchema } from './types'

export const featureToggleApi = baseApi.injectEndpoints({
  endpoints: build => ({
    featureToggle: build.query<FeatureToggle, void>({
      query: () => ({
        url: `/feature-toggle`,
        params: getQueryParams(),
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
        mapFeatureToggle(featureToggleDtoSchema.parse(response)),
    }),
  }),
})

export const { useFeatureToggleQuery } = featureToggleApi
