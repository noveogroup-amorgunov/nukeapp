import type { Decorator } from '@storybook/react-vite'
import { ThemeProvider } from '@/entities/theme'

export const withTheme: Decorator = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme

  return (
    <ThemeProvider theme={theme}>
      <StoryFn />
    </ThemeProvider>
  )
}
