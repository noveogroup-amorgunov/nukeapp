import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withTheme } from '../src/app/storybookDecorators/withTheme'
import { withStore } from '../src/app/storybookDecorators/withStore'
import { withApiMock } from '../src/app/storybookDecorators/withApiMock'
import '../src/shared/base.css'
import '../src/shared/colors.css'
import '../src/shared/breakpoints.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex',
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'light' },
        { value: 'dark', icon: 'circle', title: 'dark' },
      ],
      showName: true,
    },
  },
}

export const decorators = [withTheme, withStore, withApiMock]
