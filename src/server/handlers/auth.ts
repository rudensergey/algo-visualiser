// absolute
import jwt from "jsonwebtoken";
import { setCookie } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";

// db
import mongoApi from "@database/api";

export const authHandler = (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  new Promise((resolve) => {
    if (req.method !== "POST") {
      res.status(403);
      res.send("Method Not Allowed");
      return resolve();
    }

    const { username, password } = JSON.parse(req.body);

    mongoApi
      .getUser(username)
      .then((data) => {
        if (data && username === data.username && password === data.password) return data;
        res.status(401);
        res.send("Login failed");
        resolve();
      })
      .then((data) => {
        jwt.sign({ data }, process.env.JWT_PRIVATE_KEY, async (err, token) => {
          if (err) console.error(err);

          setCookie({ res }, "token", token, {
            secure: true,
            maxAge: 72576000,
            httpOnly: true,
            path: "/",
          });

          res.status(200);
          res.end();
          resolve();
        });
      });
  });
