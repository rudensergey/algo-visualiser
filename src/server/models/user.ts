import { Schema, model } from "mongoose";

export const userSchema = new Schema({
  username: String,
  password: String,
});

export const UserModel = model("Blog", userSchema);
