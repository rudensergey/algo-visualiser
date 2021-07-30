import * as express from "express";

const route = express.Router();

route.get("/register", async (req, res) => {
  res.status(200).send("Register");
});

route.get("/login", async (req, res) => {
  res.status(200).send("Login");
});

export default route;
