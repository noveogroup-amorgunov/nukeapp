import { sessionSlice } from './model/slice'

export { sessionSlice } from './model/slice'
export { sessionApi } from './api/sessionApi'

export const {
  isAuthorized: selectIsAuthorized,
  userId: selectUserId,
} = sessionSlice.selectors

export const resetSessionData = sessionSlice.actions.reset
