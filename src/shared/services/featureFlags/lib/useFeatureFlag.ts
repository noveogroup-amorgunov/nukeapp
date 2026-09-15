import type { FeatureToggle } from '@/shared/api'
import { useAppSelector } from '@/shared/redux'
import { featureFlagsSlice } from '../model/featureFlagsSlice'

export function useFeatureFlag(flag: Keys<FeatureToggle>) {
  return useAppSelector(featureFlagsSlice.selectors.effectiveFlags)[flag]
}
