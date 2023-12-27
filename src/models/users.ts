import User from "../schemas/user";
import { UserInterface, UserReturnType } from "../types";
import { restartConnection, validateUserCredentials } from "../utils";

export class UsersModel {
  static async register(userObject: UserInterface): Promise<UserReturnType> {
    try {
      const checkUser = validateUserCredentials(userObject);

      if (!checkUser) return { error: "Invalid input type", code: 422 };

      const checkUsername: UserInterface[] | undefined = await User.find({
        username: userObject.username,
      });
      const checkEmail: UserInterface[] | undefined = await User.find({
        email: userObject.email,
      });

      if (checkUsername.length > 0 || checkEmail.length > 0) {
        return { error: "Username or Email already exists", code: 422 };
      }

      const user = new User(userObject);

      const newUser = await user.save();

      return newUser;
    } catch (error) {
      restartConnection();
      return { error: `${error}` };
    }
  }
}
