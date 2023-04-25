import { type StoryFn } from '@storybook/react'
import { Provider as ReduxProvider } from 'react-redux'
// TODO: FSD: (import shared -> app)
// eslint-disable-next-line boundaries/element-types
import { makeStore } from '@/app/appStore'
// eslint-disable-next-line boundaries/element-types
import { loginThunk } from '@/features/authentication/Login/model/login'
import { toggleDebugMode } from '@/shared/model'
import { config } from '../config'

const store = makeStore()

store.dispatch(
  loginThunk({
    email: config.API_USER_EMAIL,
    password: config.API_USER_PASSWORD,
  })
)
store.dispatch(toggleDebugMode())

export function StorybookStoreDecorator(Story: StoryFn) {
  return (
    <ReduxProvider store={store}>
      <Story />
    </ReduxProvider>
  )
}
