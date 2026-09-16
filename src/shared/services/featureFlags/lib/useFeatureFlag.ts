import type { FeatureToggle } from '@/shared/api'
import { useAppSelector } from '@/shared/lib/redux'
import { featureFlagsSlice } from '../model/featureFlagsSlice'

export function useFeatureFlag(flag: Keys<FeatureToggle>) {
  return useAppSelector(featureFlagsSlice.selectors.effectiveFlags)[flag]
}
