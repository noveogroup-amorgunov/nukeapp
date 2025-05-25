import type { WithSlice } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '@/shared/redux'
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

const slice = createSlice({
  name: 'session',
  initialState,
  selectors: {
    isAuthorized: state => state.isAuthorized,
    userId: state => state.userId,
  },
  reducers: {
    reset: (state) => {
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

declare module '@/shared/redux/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface LazyLoadedReduxSlices extends WithSlice<typeof slice> {}
}

export const sessionSlice = slice.injectInto(rootReducer)
