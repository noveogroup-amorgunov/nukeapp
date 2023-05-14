import { baseApi } from '@/shared/api'
import { getQueryParams } from '@/shared/lib/getQueryParams'
import { mapFeatureConfig } from '../lib/mapFeatureConfig'
import { type FeatureConfig } from '../model/types'
import { type FeatureConfigDto } from './types'

export const featureConfigApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    featureConfig: build.query<FeatureConfig, void>({
      query: () => ({
        url: `/feature-config`,
        params: getQueryParams(),
      }),
      transformResponse: (response: FeatureConfigDto) =>
        mapFeatureConfig(response),
    }),
  }),
})

export const { useFeatureConfigQuery } = featureConfigApi
