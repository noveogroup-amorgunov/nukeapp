import type { FeatureToggle } from '@/shared/api'

export function mockFeatureToggleDto(
  fromQuery: Partial<FeatureToggle>,
): FeatureToggle {
  return {
    canSortProducts: fromQuery.canSortProducts ?? true,
    canTurnDarkMode: fromQuery.canTurnDarkMode ?? true,
  }
}
