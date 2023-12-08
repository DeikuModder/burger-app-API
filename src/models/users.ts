import mongoose from "mongoose";
import User from "../schemas/user";
import { UserInterface } from "../types";

export class UsersModel {
  static async createUser(userObject: UserInterface) {
    try {
      const checkUsername = await User.find({ username: userObject.username });
      const checkEmail = await User.find({ email: userObject.email });

      if (checkUsername.length > 0 || checkEmail.length > 0) {
        return { message: "Username or Email already exists" };
      }

      const user = new User(userObject);

      const newUser = await user.save();

      return newUser;
    } catch (error) {
      console.error(error);
      mongoose.connection.close();
    }
  }
}