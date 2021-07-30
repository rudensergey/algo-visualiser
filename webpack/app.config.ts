import * as path from "path";

import { Configuration, ENTRY_PATH, ENV, OUTPUT_PATH } from "./types";

const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === ENV.DEV;

const config: Configuration = {
  target: "web",
  mode: isDev ? ENV.DEV : ENV.PROD,
  entry: {
    app: path.resolve(ENTRY_PATH.APP_TS),
  },
  output: {
    clean: true,
    path: path.resolve(OUTPUT_PATH.APP),
  },
  devServer: {
    contentBase: path.resolve(OUTPUT_PATH.APP),
    compress: true,
    hot: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ENTRY_PATH.APP_HTML),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

module.exports = config;
