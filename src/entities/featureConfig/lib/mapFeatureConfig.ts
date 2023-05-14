import { type FeatureConfigDto } from '../api/types'
import { type FeatureConfig } from '../model/types'

export function mapFeatureConfig(dto: FeatureConfigDto): FeatureConfig {
  return {
    darkMode: dto.canTurnDarkMode ?? true,
    productsSort: dto.canSortProducts ?? true,
  }
}
