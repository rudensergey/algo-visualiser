declare namespace NodeJS {
  // @ts-ignore
  interface ProcessEnv {
    MYSQL_PASSWORD: string;
    MYSQL_HOST: string;
    MYSQL_PORT: number;
    SERVER_PORT: string;
    MYSQL_USER: string;
  }
}
