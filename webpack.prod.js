const webpack = require("webpack");
const path = require("path");

const babelrc = require("./.babelrc");

module.exports = {
  mode: "production",
  entry: "./src/index.jsx",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].bundle.js"
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
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  }
};
