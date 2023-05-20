import { type FeatureToggleDto } from '../types'

export function mockFeatureToggleDto(
  fromQuery: Partial<FeatureToggleDto>
): FeatureToggleDto {
  return {
    canSortProducts: fromQuery.canSortProducts ?? true,
    canTurnDarkMode: fromQuery.canTurnDarkMode ?? true,
  }
}
