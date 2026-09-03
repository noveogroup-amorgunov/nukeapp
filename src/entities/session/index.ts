import { sessionSlice } from './model/slice'

export { sessionApi } from './api/sessionApi'
export { accessTokenSyncMiddleware } from './model/accessTokenSyncMiddleware'
export { sessionSlice } from './model/slice'

export const {
  isAuthorized: selectIsAuthorized,
  userId: selectUserId,
  accessToken: selectAccessToken,
} = sessionSlice.selectors

export const resetSessionData = sessionSlice.actions.reset
