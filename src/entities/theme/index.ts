import { themeSlice } from './model/slice'

export { ThemeProvider } from './lib/ThemeProvider'

export { themeSlice }
export const selectCurrentTheme = themeSlice.selectors.currentTheme
export const changeTheme = themeSlice.actions.change
