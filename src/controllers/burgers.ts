import { Request, Response } from "express";
import { BurgersModels } from "../models/burgers";
import mongoose from "mongoose";

export class BurgersController {
  static async getAll(_req: Request, res: Response) {
    try {
      const burgers = await BurgersModels.getAll();
      res.json(burgers);
      mongoose.connection.close();
    } catch (error) {
      console.error(error);
    }
  }
}

/*
todo:
finish the CRUD
*/
