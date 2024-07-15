import { useFeatureToggleQuery } from '../api/featureToggleApi'
import type { FeatureToggle } from '../model/types'

export function useFeatureToggle(feature: Keys<FeatureToggle>) {
  const { data } = useFeatureToggleQuery()

  if (!data) {
    return null
  }

  return data[feature]
}
