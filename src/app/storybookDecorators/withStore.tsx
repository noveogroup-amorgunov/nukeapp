import { type Decorator } from '@storybook/react'
import { Provider as ReduxProvider } from 'react-redux'
import { makeStore } from '@/app/appStore'
import { loginThunk } from '@/features/authentication/login/model/login'
import { env } from '@/shared/lib'
import { toggleDebugMode } from '@/widgets/DebugModeToggler/model/slice'

const store = makeStore()

store.dispatch(
  loginThunk({
    email: env.VITE_API_USER_EMAIL,
    password: env.VITE_API_USER_PASSWORD,
  })
)
store.dispatch(toggleDebugMode())

export const withStore: Decorator = (StoryFn, context) => {
  return (
    <ReduxProvider store={store}>
      <StoryFn />
    </ReduxProvider>
  )
}
