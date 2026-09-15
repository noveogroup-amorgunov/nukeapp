import { themeSlice } from './model/slice'

export { setupThemeSync } from './lib/setupThemeSync'
export { themeSlice } from './model/slice'
export type { Theme } from './model/types'
export { ChangeThemeIconButton } from './ui/ChangeTheme/ChangeThemeIconButton'

export const {
  currentTheme: selectCurrentTheme,
} = themeSlice.selectors
