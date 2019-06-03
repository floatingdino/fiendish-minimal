const webpack = require("webpack");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const babelrc = require("./.babelrc");

const resolve = require("./resolve");

module.exports = {
  mode: "production",
  entry: "./src/index.jsx",
  output: {
    filename: "rf_mnml.js",
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
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    })
  ],
  ...resolve
};
