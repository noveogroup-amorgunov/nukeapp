import { createListenerMiddleware } from '@reduxjs/toolkit'
import { logoutThunk } from './logout'
import { apiAccessTokenIsBrokenEvent } from '@/shared/api'
import type { AppDispatch, AppState } from '@/shared/redux'
import { dynamicMiddleware } from '@/shared/redux'

export const logoutMiddleware = createListenerMiddleware<AppState, AppDispatch>()

logoutMiddleware.startListening({
  actionCreator: apiAccessTokenIsBrokenEvent,
  effect: async (_, api) => {
    api.dispatch(logoutThunk())
  },
})

dynamicMiddleware.addMiddleware(logoutMiddleware.middleware)
