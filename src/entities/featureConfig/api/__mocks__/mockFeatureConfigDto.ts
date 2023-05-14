import { type FeatureConfigDto } from '../types'

export function mockFeatureConfigDto(
  fromQuery: Partial<FeatureConfigDto>
): FeatureConfigDto {
  return {
    canSortProducts: fromQuery.canSortProducts ?? true,
    canTurnDarkMode: fromQuery.canTurnDarkMode ?? true,
  }
}
