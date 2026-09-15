import type { Decorator } from '@storybook/react-vite'
import type { Theme } from '@/entities/theme'
import { themeSlice } from '@/entities/theme'
import { storybookStore } from './withStore'

export const withTheme: Decorator = (StoryFn, context) => {
  const theme = (context.parameters.theme || context.globals.theme) as Theme

  if (theme !== themeSlice.selectors.currentTheme(storybookStore.getState())) {
    storybookStore.dispatch(themeSlice.actions.toggle(theme))
    document.documentElement.setAttribute('data-theme', theme)
  }

  return <StoryFn />
}
