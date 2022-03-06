// absolute
import jwt from "jsonwebtoken";
import { setCookie } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";

// db
import mongoApi from "@database/api";

// mock
import { mockUser } from "../user";

export const authHandler = (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  new Promise((resolve) => {
    if (req.method !== "POST") {
      res.status(403).send("Method Not Allowed");
      resolve();
    }

    const body = JSON.parse(req.body);

    const { username } = body;
    const { password } = body;

    if (username !== mockUser.username || password !== mockUser.password) {
      res.status(401).send("Login failed");
      resolve();
    }

    jwt.sign({ mockUser }, process.env.JWT_PRIVATE_KEY, async (err, token) => {
      if (err) console.error(err);

      setCookie({ res }, "token", token, {
        secure: true,
        maxAge: 72576000,
        httpOnly: true,
        path: "/",
      });

      res.status(200).end();
      resolve();
    });
  });
