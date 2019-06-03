const webpack = require("webpack");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const babelrc = require("./.babelrc");

const resolve = require("./resolve");

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: "./src/index.jsx",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].bundle.js",
    publicPath: "//localhost:8080/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              ...babelrc
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  ...resolve,
  devServer: {
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true,
    https: true
  }
};
