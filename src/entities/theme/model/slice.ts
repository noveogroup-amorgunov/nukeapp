import type { PayloadAction, WithSlice } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'
import { rootReducer } from '@/shared/redux'
import type { Theme } from './types'

type ThemeSliceState = {
  currentTheme: Theme
}

const initialState: ThemeSliceState = {
  currentTheme: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
}

const slice = createSlice({
  name: 'theme',
  initialState,
  selectors: {
    currentTheme: state => state.currentTheme,
  },
  reducers: {
    toggle: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload
    },
  },
  extraReducers: (builder) => {
    // Restore state from redux-persist
    builder.addCase(REHYDRATE, (state, action) => {
      const typedAction = action as PayloadAction<{ theme: ThemeSliceState }>
      if (typedAction.payload?.theme) {
        state.currentTheme = typedAction.payload.theme.currentTheme
      }
    })
  },
})

declare module '@/shared/redux/model/types' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface LazyLoadedReduxSlices extends WithSlice<typeof slice> {}
}

export const themeSlice = slice.injectInto(rootReducer)
