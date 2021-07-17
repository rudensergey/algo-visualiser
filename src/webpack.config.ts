import { resolve } from "path";
import { Configuration } from "webpack";

const NodemonWebpackPlugin = require("nodemon-webpack-plugin");

enum ENV {
  PROD = "production",
  DEV = "development",
}

const isDev = process.env.NODE_ENV === ENV.DEV;

const config: Configuration = {
  target: "node",
  mode: isDev ? ENV.DEV : ENV.PROD,
  entry: {
    server: resolve(__dirname, "server/index.ts"),
  },
  output: {
    path: resolve("build"),
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
