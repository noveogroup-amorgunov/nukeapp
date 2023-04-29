import { type Decorator } from '@storybook/react'
import { ThemeProvider } from '@/entities/theme'

export const withTheme: Decorator = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme

  return (
    <ThemeProvider theme={theme}>
      <StoryFn />
    </ThemeProvider>
  )
}
