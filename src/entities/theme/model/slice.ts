import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '@/shared/lib/store/rootReducer'
import type { Theme } from './types'

type ThemeSliceState = {
  currentTheme: Theme
}

const initialState: ThemeSliceState = {
  currentTheme: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload
    },
  },
  selectors: {
    currentTheme: state => state.currentTheme,
  },
})

themeSlice.injectInto(rootReducer)
