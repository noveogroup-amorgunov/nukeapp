import type { Decorator } from '@storybook/react-vite'
import { Provider as ReduxProvider } from 'react-redux'
import { setupThemeSync } from '@/entities/theme'
import { loginThunk } from '@/features/session/login/model/login'
import { env } from '@/shared/lib'
import { makeStore } from '@/shared/redux'
import { featureFlagsSlice } from '@/shared/services/featureFlags'

const store = makeStore({ persisted: false })

setupThemeSync(store)

export { store as storybookStore }

store.dispatch(
  loginThunk({
    email: env.VITE_API_USER_EMAIL,
    password: env.VITE_API_USER_PASSWORD,
  }),
)
store.dispatch(
  featureFlagsSlice.actions.setFetched({
    darkMode: true,
    productsSort: true,
    debugMode: true,
  }),
)

export const withStore: Decorator = (StoryFn, _) => {
  return (
    <ReduxProvider store={store}>
      <StoryFn />
    </ReduxProvider>
  )
}
