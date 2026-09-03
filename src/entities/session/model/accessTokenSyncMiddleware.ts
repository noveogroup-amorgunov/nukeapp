import { createListenerMiddleware } from '@reduxjs/toolkit'
import { setApiAccessToken } from '@/shared/api'
import type { AppDispatch, AppState } from '@/shared/redux'
import { dynamicMiddleware } from '@/shared/redux'
import { sessionSlice } from './slice'

/**
 * Sync access token from session slice to `@/shared/api/baseQuery.ts`
 */
export const accessTokenSyncMiddleware
  = createListenerMiddleware<AppState, AppDispatch>()

accessTokenSyncMiddleware.startListening({
  predicate: (_, currentState, previousState) => {
    return (
      sessionSlice.selectors.accessToken(currentState)
      !== sessionSlice.selectors.accessToken(previousState)
    )
  },
  effect: (_, api) => {
    setApiAccessToken(sessionSlice.selectors.accessToken(api.getState()) ?? null)
  },
})

dynamicMiddleware.addMiddleware(accessTokenSyncMiddleware.middleware)
