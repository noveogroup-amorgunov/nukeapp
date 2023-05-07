import React from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'
import { Link } from 'react-router-dom'
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
  reactRouter: {
    routePath: '/',
    errorElement: (
      <div>
        Storybook don't works with routes, <Link to="/">go back</Link> to stoty
      </div>
    ),
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
    },
  },
}

export const decorators = [withTheme, withStore, withApiMock, withRouter]
