import { generatedApi } from '@/shared/api'
import type { BooleanAsString } from '@/shared/api'
import { getQueryParams } from '@/shared/lib/router'
import type { AppDispatch } from '@/shared/redux'

function toBooleanAsString(value: unknown): BooleanAsString | undefined {
  return value === 'true' || value === 'false' ? value : undefined
}

export async function featureToggleLoader(dispatch: AppDispatch) {
  const { canSortProducts, canTurnDarkMode } = getQueryParams()

  const loader = dispatch(
    generatedApi.endpoints.getFeatureToggle.initiate({
      canSortProducts: toBooleanAsString(canSortProducts),
      canTurnDarkMode: toBooleanAsString(canTurnDarkMode),
    }),
  )

  try {
    return await loader.unwrap()
  }
  catch (error) {
    console.error(error)
    // TODO: use fallback feature config
  }
  finally {
    loader.unsubscribe()
  }
}
