// Absolute
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

// Models
import { mockUser } from "@models/user";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const username = JSON.parse(body.username);
  const password = JSON.parse(body.password);

  if (username === mockUser.username && password === mockUser.password) {
    jwt.sign({ mockUser }, process.env.JSW_PRIVATE_KEY, { expiresIn: "10m" }, (err, token) => {
      if (err) console.error(err);
      res.send(token);
    });
  } else {
    res.status(200).send({ message: "username or password are incorrect" });
  }
}
