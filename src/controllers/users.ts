import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UsersModel } from "../models/users";
import { UserInterface } from "../types";

export class UsersController {
  static async register(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;

      const passwordHash = await bcrypt.hash(password, 10);

      const newUserObject: UserInterface = {
        username,
        passwordHash,
        email,
      };

      const savedUser = await UsersModel.register(newUserObject);

      savedUser.hasOwnProperty("error")
        ? res.status(400).json(savedUser)
        : res.json(savedUser);
    } catch (error) {
      res.status(500).send(`${error}`);
    }
  }
}
