// absolute
import mongoose from "mongoose";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// db
import mongoApi from "@database/api";

export const connectMiddleware = (handler) => async (req: NextApiRequest, res: NextResponse) => {
  if (mongoose.connections[0].readyState) return handler(req, res);
  await mongoApi.connectMongoDB();
  return handler(req, res);
};
