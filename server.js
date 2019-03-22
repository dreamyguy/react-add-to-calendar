var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config')

config.devtool = 'cheap-module-eval-source-map'
config.entry.unshift('webpack-hot-middleware/client')
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
)

var app = express()
var compiler = webpack(config)

console.log('TCL: config.entry', config.entry)

console.log('TCL: config.output.path', config.output.path)

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  path: config.output.path
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(8080, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:8080')
})
