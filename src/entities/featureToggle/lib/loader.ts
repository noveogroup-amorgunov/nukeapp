import { featureToggleApi } from '../api/featureToggleApi'

export async function featureToggleLoader(dispatch: AppDispatch) {
  const loader = dispatch(featureToggleApi.endpoints.featureToggle.initiate())

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
