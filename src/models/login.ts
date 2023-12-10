import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../schemas/user";
import { LogedInUser, UserForToken } from "../types";

dotenv.config();

export class LoginModel {
  static async login(userObject: LogedInUser) {
    try {
      const user = await User.findOne({ username: userObject.username });
      const isPasswordCorrect =
        user === null
          ? false
          : await bcrypt.compare(userObject.passwordHash, user.passwordHash);

      if (!(user && isPasswordCorrect)) {
        return { error: "Invalid user or password" };
      }

      const userForToken: UserForToken = {
        id: user._id,
        username: user.username,
      };

      const token = jwt.sign(userForToken, process.env.SECRET as jwt.Secret);

      return {
        username: user.username,
        email: user.email,
        token,
      };
    } catch (error) {
      console.error(error);
      mongoose.connection.close();
    }
  }
}
