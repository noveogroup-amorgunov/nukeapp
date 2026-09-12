import type { FeatureToggle } from '@/shared/api'

export function mockFeatureToggleDto(
  fromQuery: Partial<FeatureToggle>,
): FeatureToggle {
  return {
    productsSort: fromQuery.productsSort ?? true,
    darkMode: fromQuery.darkMode ?? true,
  }
}
