const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");

enum ENV {
  PROD = "production",
  DEV = "development",
}

const isDev = process.env.NODE_ENV === ENV.DEV;

module.exports = {
  target: "node",
  mode: isDev ? ENV.DEV : ENV.PROD,
  entry: {
    server: path.resolve(__dirname, "server/index.ts"),
  },
  output: {
    path: path.resolve("build"),
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
  plugins: [new NodemonPlugin()],
};
