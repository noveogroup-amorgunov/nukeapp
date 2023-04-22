import { createSlice } from '@reduxjs/toolkit'

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
    toggleDebugMode: (state) => {
      state.isEnabled = !state.isEnabled
    },
  },
})

export const { toggleDebugMode } = debugModeSlice.actions
