import { sessionSlice } from './model/slice'

export { accessTokenSyncMiddleware } from './model/accessTokenSyncMiddleware'
export { sessionSlice } from './model/slice'
export { useLoginMutation } from '@/shared/api'

export const {
  isAuthorized: selectIsAuthorized,
  userId: selectUserId,
  accessToken: selectAccessToken,
} = sessionSlice.selectors

export const resetSessionData = sessionSlice.actions.reset
