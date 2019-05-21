const webpack = require("webpack");
const path = require("path");

const babelrc = require("./.babelrc");

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].bundle.js",
    publicPath: "http://localhost:8080/"
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
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  devServer: {
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true
  }
};
