import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '../src/shared/base.css'
import '../src/shared/colors.css'
import '../src/shared/breakpoints.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
