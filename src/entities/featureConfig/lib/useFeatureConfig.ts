import { useFeatureConfigQuery } from '../api/featureConfigApi'
import { type FeatureConfig } from '../model/types'

export function useFeatureConfig(feature: Keys<FeatureConfig>) {
  const { data } = useFeatureConfigQuery()

  if (!data) {
    return null
  }

  return data[feature]
}
