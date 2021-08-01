// Absolute imports
import * as express from "express";

// Routes
import auth from "./routes/auth.route";

// Middlewares
import { logger } from "./middlewares/helpers.middleware";
import { connectDB } from "./utils/db";

const {
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PORT,
  SERVER_PORT = 8000,
} = process.env;

connectDB({ MYSQL_PASSWORD, MYSQL_HOST, MYSQL_USER, MYSQL_PORT });

const app = express();

app.use(logger);
app.use("/api/auth", auth);

app.listen(SERVER_PORT, () => {
  console.log(`App has been started on port ${SERVER_PORT}...`);
});
