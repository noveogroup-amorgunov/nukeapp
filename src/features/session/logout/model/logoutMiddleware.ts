import {
  createListenerMiddleware,
  type TypedStartListening,
} from '@reduxjs/toolkit'
import { apiAccessTokenIsBrokenEvent } from '@/shared/api'
import { logoutThunk } from './logout'

export const logoutMiddleware = createListenerMiddleware()

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type TypedListening = TypedStartListening<RootState, AppDispatch>

export const logoutMiddlewareStartListening =
  logoutMiddleware.startListening as TypedListening

logoutMiddlewareStartListening({
  actionCreator: apiAccessTokenIsBrokenEvent,
  effect: async (_, api) => {
    api.dispatch(logoutThunk())
  },
})
