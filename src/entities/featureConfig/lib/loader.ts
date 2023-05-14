import { featureConfigApi } from '../api/featureConfigApi'

export async function featureConfigLoader(dispatch: AppDispatch) {
  const loader = dispatch(featureConfigApi.endpoints.featureConfig.initiate())

  try {
    return await loader.unwrap()
  } catch (error) {
    console.error(error)
    // TODO: use fallback feature config
  } finally {
    loader.unsubscribe()
  }
}
