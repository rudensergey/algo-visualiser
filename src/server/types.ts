export interface TMySQLConfig {
  MYSQL_PASSWORD: string;
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  MYSQL_USER: string;
}

export type TConnectDB = (config: TMySQLConfig) => void;
