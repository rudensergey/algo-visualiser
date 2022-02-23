// absolute
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export function dataHandler(req: NextApiRequest, res: NextApiResponse) {
  const header = req.headers.authorization;

  if (typeof header !== "undefined" && req.method === "GET") {
    const bearer = header.split(" ");
    const token = bearer[1];

    jwt.verify(token, process.env.JSW_PRIVATE_KEY, (err, authorizedData) => {
      if (err) {
        res.status(403).end();
        console.log(`ERROR: Could not connect to the protected route, ${err}`);
      } else {
        res.status(200).send({ message: "Successful log in", authorizedData });
        console.log("SUCCESS: Connected to protected route");
      }
    });
  } else {
    res.status(403).send({ message: "You do not have acces to this data" });
  }
}
