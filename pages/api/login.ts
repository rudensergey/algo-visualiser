// Absolute
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

// Models
import { mockUser } from "@models/user";

const loginHandler = (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
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

    jwt.sign({ mockUser }, process.env.JSW_PRIVATE_KEY, { expiresIn: "10m" }, (err, token) => {
      if (err) console.error(err);
      res.status(200).send({ token });
      resolve();
    });
  });

export default loginHandler;
