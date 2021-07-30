import { RequestHandler } from "express";

export const logger: RequestHandler = (req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
};
