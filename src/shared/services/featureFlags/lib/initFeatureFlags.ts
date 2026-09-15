import { generatedApi } from '@/shared/api'
import type { AppDispatch } from '@/shared/redux'
import { featureFlagsSlice } from '../model/featureFlagsSlice'

export async function initFeatureFlags(dispatch: AppDispatch) {
  const loader = dispatch(generatedApi.endpoints.getFeatureToggle.initiate())

  try {
    dispatch(featureFlagsSlice.actions.setFetched(await loader.unwrap()))
  }
  catch (error) {
    console.error(error)
    // TODO: use fallback feature config
  }
  finally {
    loader.unsubscribe()
  }
}
