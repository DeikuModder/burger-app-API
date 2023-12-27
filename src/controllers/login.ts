import { Request, Response } from "express";
import { LogedInUser } from "../types";
import { LoginModel } from "../models/login";

export class LoginController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const userObject: LogedInUser = {
        username,
        passwordHash: password,
      };

      const checkUser = await LoginModel.login(userObject);

      "error" in checkUser!
        ? res.status(checkUser.code!).json(checkUser.error)
        : res.json(checkUser);
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
}
