import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UsersModel } from "../models/users";
import { UserInterface } from "../types";

export class UsersController {
  static async createUser(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;

      const passwordHash = await bcrypt.hash(password, 10);

      const newUserObject: UserInterface = {
        username,
        passwordHash,
        email,
      };

      const savedUser = await UsersModel.createUser(newUserObject);

      res.json(savedUser);
    } catch (error) {
      console.error(error);
    }
  }
}
