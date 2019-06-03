const webpack = require("webpack");
const path = require("path");

const babelrc = require("./.babelrc");

const resolve = require("./resolve");

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
  resolve
};
