import { useGetFeatureToggleQuery } from '@/shared/api'
import type { FeatureToggle } from '@/shared/api'

export function useFeatureToggle(feature: Keys<FeatureToggle>) {
  const { data } = useGetFeatureToggleQuery({})

  if (!data) {
    return null
  }

  return data[feature]
}
