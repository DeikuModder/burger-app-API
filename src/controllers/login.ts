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

      res.json(checkUser);
    } catch (error) {
      console.error(error);
    }
  }
}
