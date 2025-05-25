import type { PayloadAction, WithSlice } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'
import { rootReducer } from '@/shared/redux'
import { sessionApi } from '../api/sessionApi'
import type { SessionUserId } from './types'

export type SessionSliceState =
  | {
    isAuthorized: true
    accessToken: string
    userId: SessionUserId
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
    // Restore state from redux-persist
    builder.addCase(REHYDRATE, (state, action) => {
      const typedAction = action as PayloadAction<{ session: SessionSliceState }>
      if (typedAction.payload?.session) {
        state.isAuthorized = typedAction.payload.session.isAuthorized as false
        state.userId = typedAction.payload.session.userId
        state.accessToken = typedAction.payload.session.accessToken
      }
    })

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
