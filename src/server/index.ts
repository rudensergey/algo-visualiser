// Absolute imports
import * as express from "express";

// Routes
import auth from "./routes/auth.route";

// Middlewares
import { logger } from "./middlewares/helpers.middleware";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger);
app.use("/api/auth", auth);

app.listen(PORT, () => {
  console.log(`App has been started on port ${PORT}...`);
});
