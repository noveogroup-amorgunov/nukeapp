import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, WithSlice } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'
import { rootReducer } from '@/shared/redux'

type DebugModeSlice = {
  isEnabled: boolean
}

const initialState: DebugModeSlice = {
  isEnabled: true,
}

const slice = createSlice({
  name: 'debugMode',
  initialState,
  selectors: {
    isEnabled: (state) => {
      return state.isEnabled
    },
  },
  reducers: {
    toggle: (state) => {
      state.isEnabled = !state.isEnabled
    },
  },
  extraReducers: (builder) => {
    // Restore state from redux-persist
    builder.addCase(REHYDRATE, (state, action) => {
      const typedAction = action as PayloadAction<{ debugMode: DebugModeSlice }>
      if (typedAction.payload?.debugMode) {
        state.isEnabled = typedAction.payload.debugMode.isEnabled
      }
    })
  },
})

declare module '@/shared/redux/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface LazyLoadedReduxSlices extends WithSlice<typeof slice> {}
}

export const debugModeSlice = slice.injectInto(rootReducer)
