// middlewares
import { dataHandler } from "@handlers/data";
import { connectMiddleware } from "@middlewares/mongodb";

export default connectMiddleware(dataHandler);
