const path = require('node:path')

module.exports = {
  plugins: [
    require('postcss-import')({ path: [path.resolve(__dirname, '/')] }),
    require('autoprefixer'),
    require('postcss-mixins'),
    require('postcss-custom-media'),
    require('postcss-nested'),
  ],
}
