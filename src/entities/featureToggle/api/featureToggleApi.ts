import { baseApi } from '@/shared/api'
import { getQueryParams } from '@/shared/lib/getQueryParams'
import { mapFeatureToggle } from '../lib/mapFeatureToggle'
import { type FeatureToggle } from '../model/types'
import { type FeatureToggleDto } from './types'

export const featureToggleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    featureToggle: build.query<FeatureToggle, void>({
      query: () => ({
        url: `/feature-toggle`,
        params: getQueryParams(),
      }),
      transformResponse: (response: FeatureToggleDto) =>
        mapFeatureToggle(response),
    }),
  }),
})

export const { useFeatureToggleQuery } = featureToggleApi
