var WebpackDevServer = require('webpack-dev-server')
var webpack          = require('webpack')
var config           = require('./webpack.dev.config')
var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot:                true,
  contentBase: "./src",
  historyApiFallback: true,
  stats: {
    colors: true,
    // Not output chunks info.
    chunks: false
  }
}).listen(2333, 'localhost', (err, result) => {
  if(err) {
    return console.log(err)
  }
  console.log('Listening at http://localhost:2333/')
})
