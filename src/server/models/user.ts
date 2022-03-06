import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
});

const UserModel = models.UserModel || model("user", userSchema);

export default UserModel;
