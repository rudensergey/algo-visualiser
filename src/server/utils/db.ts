import * as mysql from "mysql";
import { config } from "dotenv";
import { TMySQLConfig } from "../types";

config();

export function connectDB({
  MYSQL_PASSWORD,
  MYSQL_HOST = "localhost",
  MYSQL_USER = "root",
  MYSQL_PORT = 3306,
}: TMySQLConfig): void {
  const connection = mysql.createConnection({
    password: MYSQL_PASSWORD,
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
  });

  connection.connect((err) => {
    if (err) return console.error(`${err.message} / ${err.sqlMessage}`);
    console.log("Connected");
  });
}
