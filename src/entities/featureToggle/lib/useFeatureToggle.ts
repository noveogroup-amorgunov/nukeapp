import type { FeatureToggle, GetFeatureToggleApiArg } from '@/shared/api'
import { useGetFeatureToggleQuery } from '@/shared/api'
import { getQueryParams } from '@/shared/lib/router'

export function useFeatureToggle(feature: Keys<FeatureToggle>) {
  const { data } = useGetFeatureToggleQuery(
    getQueryParams() as GetFeatureToggleApiArg,
  )

  if (!data) {
    return null
  }

  return data[feature]
}
