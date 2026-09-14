import type { GetFeatureToggleApiArg } from '@/shared/api'
import { generatedApi } from '@/shared/api'
import { getQueryParams } from '@/shared/lib/router'
import type { AppDispatch } from '@/shared/redux'

export async function featureToggleLoader(dispatch: AppDispatch) {
  const loader = dispatch(
    generatedApi.endpoints.getFeatureToggle.initiate(
      getQueryParams() as GetFeatureToggleApiArg,
    ),
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
