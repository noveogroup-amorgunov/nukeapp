const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import')({ path: [path.resolve(__dirname + "/")] }),
    require('autoprefixer'),
    require('postcss-mixins'),
    require('postcss-custom-media'),
    require('postcss-nested'),
  ],
}
