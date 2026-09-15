import type { FeatureToggle } from '@/shared/api'
import { useAppSelector } from '@/shared/redux'
import { featureFlagsSlice } from '../model/featureFlagsSlice'

export function useFeatureFlag(flag: Keys<FeatureToggle>) {
  const values = useAppSelector(featureFlagsSlice.selectors.values)
  const overrides = useAppSelector(featureFlagsSlice.selectors.overrides)

  if (!values) {
    return null
  }

  return overrides[flag] ?? values[flag]
}
