// middlewares
import { connectMiddleware } from "@middlewares/mongodb";
import { authHandler } from "@handlers/auth";

export default connectMiddleware(authHandler);
