import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

export enum ENTRY_PATH {
  SERVER = "./src/server/index.ts",
  APP_TS = "./src/app/index.tsx",
  APP_HTML = "./src/app/index.html",
}

export enum OUTPUT_PATH {
  SERVER = "build/server",
  APP = "build/app",
}

export enum ENV {
  PROD = "production",
  DEV = "development",
}

export interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}
