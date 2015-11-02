var webpack = require("webpack");
var path = require("path");
var deps = Object.keys(require("./package.json").dependencies);
var config = require("./config/config")

module.exports = {
  entry: {
    app: "./app/App.js", // Your appʼs entry point
    vendor: deps.concat([])
  },
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: path.join(__dirname, "dist")
  },
  module: {
    loaders: [
      {test: /\.js$/, loaders: ["jsx-loader?harmony&stripTypes"], exclude: /node_modules/}
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({"process.env": {COMPRESS: 1, NODE_ENV: JSON.stringify("production")}}),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new webpack.DefinePlugin({
      FIREBASE_NAME: JSON.stringify(config.firebase_app_name),
      DEBUG_MODE: config.debug
    })
  ]
};
