import { createAction } from '@reduxjs/toolkit'

export const invalidateAccessToken = createAction(
  'session/invalidateAccessToken'
)
