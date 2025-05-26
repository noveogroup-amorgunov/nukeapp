import { themeSlice } from './model/slice'

export { themeSlice } from './model/slice'
export { ThemeProvider } from './lib/ThemeProvider'
export { ChangeTheme } from './ui/ChangeTheme/ChangeTheme'

export const {
  currentTheme: selectCurrentTheme,
} = themeSlice.selectors
