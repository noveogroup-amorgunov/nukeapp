import { type StoryFn } from '@storybook/react'
import { ApiMockProvider } from '../ApiMockProvider'
import { config } from '../config'
// TODO: FSD
import { makeStore } from '@/app/appStore'
import { loginThunk } from '@/features/authentication/Login/model/login'
import { toggleDebugMode } from '@/widgets/DebugMode/model/slice'

const store = makeStore()

store.dispatch(
  loginThunk({
    email: config.API_USER_EMAIL,
    password: config.API_USER_PASSWORD,
  })
)
store.dispatch(toggleDebugMode())

export function StorybookApiMockDecorator(Story: StoryFn) {
  return (
    <ApiMockProvider store={store}>
      <Story />
    </ApiMockProvider>
  )
}
