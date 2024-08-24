import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '@/shared/lib/store'

type DebugModeSlice = {
  isEnabled: boolean
}

const initialState: DebugModeSlice = {
  isEnabled: true,
}

export const debugModeSlice = createSlice({
  name: 'debugMode',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isEnabled = !state.isEnabled
    },
  },
  selectors: {
    isEnabled: (state) => {
      return state.isEnabled
    },
  },
})

rootReducer.inject(debugModeSlice)
