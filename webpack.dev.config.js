var path              = require('path')
var webpack           = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:2333', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/app' // Your appʼs entry point
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js?v[hash:10]',
    publicpath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html', inject: 'body' })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['jsx?harmony', 'babel'],
      include: path.join(__dirname, 'src')
    }]
  }
}
