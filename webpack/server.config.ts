import { resolve } from "path";
import { Configuration } from "webpack";
import { ENTRY_PATH, ENV, OUTPUT_PATH } from "./types";

const NodemonWebpackPlugin = require("nodemon-webpack-plugin");

const isDev = process.env.NODE_ENV === ENV.DEV;

const config: Configuration = {
  target: "node",
  mode: isDev ? ENV.DEV : ENV.PROD,
  entry: {
    server: resolve(ENTRY_PATH.SERVER),
  },
  output: {
    clean: true,
    path: resolve(OUTPUT_PATH.SERVER),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new NodemonWebpackPlugin()],
};

module.exports = config;
