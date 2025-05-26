import { themeSlice } from './model/slice'

export { themeSlice } from './model/slice'
export { ChangeTheme } from './ui/ChangeTheme/ChangeTheme'

export const {
  currentTheme: selectCurrentTheme,
} = themeSlice.selectors

export type { Theme } from './model/types'
