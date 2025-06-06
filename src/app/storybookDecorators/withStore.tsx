import type { Decorator } from '@storybook/react'
import { Provider as ReduxProvider } from 'react-redux'
import { loginThunk } from '@/features/session/login/model/login'
import { env } from '@/shared/lib'
import { makeStore } from '@/shared/redux'
import { toggleDebugMode } from '@/widgets/Layout'

const store = makeStore()

store.dispatch(
  loginThunk({
    email: env.VITE_API_USER_EMAIL,
    password: env.VITE_API_USER_PASSWORD,
  }),
)
store.dispatch(toggleDebugMode())

export const withStore: Decorator = (StoryFn, _) => {
  return (
    <ReduxProvider store={store}>
      <StoryFn />
    </ReduxProvider>
  )
}
