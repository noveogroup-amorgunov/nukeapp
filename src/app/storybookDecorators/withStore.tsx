import { type Decorator } from '@storybook/react'
import { Provider as ReduxProvider } from 'react-redux'
import { makeStore } from '@/app/appStore'
import { loginThunk } from '@/features/authentication/Login/model/login'
import { config } from '@/shared/lib'
import { toggleDebugMode } from '@/shared/model'

const store = makeStore()

store.dispatch(
  loginThunk({
    email: config.API_USER_EMAIL,
    password: config.API_USER_PASSWORD,
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
