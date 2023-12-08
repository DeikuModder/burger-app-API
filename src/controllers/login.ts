import { Request, Response } from "express";
import { UserInterface } from "../types";
import { LoginModel } from "../models/login";

export class LoginController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;

      const userObject: UserInterface = {
        username,
        passwordHash: password,
        email,
      };

      const checkUser = await LoginModel.login(userObject);

      res.json(checkUser);
    } catch (error) {
      console.error(error);
    }
  }
}
