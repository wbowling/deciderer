var webpack = require('webpack')
var path = require('path')
var config = require('./config/config')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './app/App.js' // Your appʼs entry point
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.join(__dirname, 'public')
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'react-hot', 'babel?presets[]=react&presets[]=es2015' ], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      FIREBASE_NAME: JSON.stringify(config.firebase_app_name),
      DEBUG_MODE: config.debug
    })
  ]
}
