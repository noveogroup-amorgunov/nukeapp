import type { FeatureToggleDto } from '../api/types'
import type { FeatureToggle } from '../model/types'

export function mapFeatureToggle(dto: FeatureToggleDto): FeatureToggle {
  return {
    darkMode: dto.canTurnDarkMode ?? true,
    productsSort: dto.canSortProducts ?? true,
  }
}
