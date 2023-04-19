import { createSlice } from '@reduxjs/toolkit'

type WidgetSlice = {
  isDebugMode: boolean
}

const initialState: WidgetSlice = {
  isDebugMode: true,
}

export const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    toggleDebugMode: (state) => {
      state.isDebugMode = !state.isDebugMode
    },
  },
})

export const { toggleDebugMode } = widgetSlice.actions
