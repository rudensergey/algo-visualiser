import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

export enum ENTRY_PATH {
  APP_TS = "./src/index.tsx",
  APP_HTML = "./src/index.html",
}

export enum OUTPUT_PATH {
  APP = "build/app",
}

export enum ENV {
  PROD = "production",
  DEV = "development",
}

export interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}
