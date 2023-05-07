const { mergeConfig } = require('vite')
const { resolve } = require('path')
const svgr = require('vite-plugin-svgr')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-react-router-v6"
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  "core": {
    "builder": "@storybook/builder-vite"
  },
  // async viteFinal(config, { configType }) {
  //   return mergeConfig(config, {
  //     plugins: [svgr()],
  //     // TODO: //
  //     // resolve: {
  //     //   alias: {
  //     //     '@components': resolve(__dirname, '../src/components'),
  //     //     '@shared': resolve(__dirname, '../src/shared'),
  //     //   },
  //     // },
  //   })
  // },
}
