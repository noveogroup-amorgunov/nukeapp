import { createSlice } from '@reduxjs/toolkit'
import { sessionApi } from '../api/sessionApi'
import { type SessionUserId } from './types'

type SessionSliceState =
  | {
      accessToken: string
      userId: SessionUserId
      isAuthorized: true
    }
  | {
      isAuthorized: false
      accessToken?: string
      userId?: SessionUserId
    }

const initialState: SessionSliceState = {
  isAuthorized: false,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    clearSessionData: (state) => {
      state.accessToken = undefined
      state.userId = undefined
      state.isAuthorized = false
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      sessionApi.endpoints.login.matchFulfilled,
      (state: SessionSliceState, { payload }) => {
        state.isAuthorized = true

        // say TypeScript that isAuthorized = true
        if (state.isAuthorized) {
          state.userId = payload.userId
          state.accessToken = payload.accessToken
        }
      }
    )
  },
})

export const selectIsAuthorized = (state: RootState) =>
  state.session.isAuthorized

export const selectUserId = (state: RootState) => state.session.userId

export const { clearSessionData } = sessionSlice.actions
