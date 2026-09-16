import { generatedApi } from '@/shared/api'
import type { AppDispatch } from '@/shared/lib/redux'
import { featureFlagsSlice } from '../model/featureFlagsSlice'

export function initFeatureFlags() {
  return async (dispatch: AppDispatch) => {
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
}
