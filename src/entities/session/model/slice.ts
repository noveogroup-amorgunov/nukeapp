import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '@/shared/lib/store/rootReducer'
import { sessionApi } from '../api/sessionApi'
import type { SessionUserId } from './types'

export type SessionSliceState =
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
  selectors: {
    isAuthorized: state => state.isAuthorized,
    userId: state => state.userId,
  },
  reducers: {
    clear: (state) => {
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
      },
    )
  },
})

rootReducer.inject(sessionSlice)
