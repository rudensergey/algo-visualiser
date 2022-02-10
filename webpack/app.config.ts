import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import { Configuration, ENTRY_PATH, ENV } from "./types";

const isDev = process.env.NODE_ENV === ENV.DEV;

const config: Configuration = {
  target: "web",
  mode: isDev ? ENV.DEV : ENV.PROD,
  entry: {
    app: path.resolve(ENTRY_PATH.APP_TS),
  },
  output: {
    clean: true,
    path: path.resolve("build"),
  },
  devServer: {
    contentBase: path.resolve("build"),
    compress: false,
    hot: true,
    port: 9000,
  },
  resolve: {
    alias: {
      "@shared": path.resolve("./src/components/_shared/"),
      "@templates": path.resolve("./src/components/_templates/"),
      "@utils": path.resolve("./src/utils/"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
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
