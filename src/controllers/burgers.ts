import { Request, Response } from "express";
import { BurgersModels } from "../models/burgers";
import { BurgerInterface } from "../types";

export class BurgersController {
  static async getAll(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const burgers = await BurgersModels.getAll<typeof name>({ name });
      res.json(burgers);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const burgers = await BurgersModels.getById<typeof id>({ id });
      res.json(burgers);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, price, ...data } = req.body;

      const newBurger: BurgerInterface = { name, price, ...data };
      const burgers = await BurgersModels.create(newBurger);

      if (burgers) {
        res.status(201).json(burgers);
      } else {
        res.status(400);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const burgers = await BurgersModels.delete<typeof id>({ id });
      res.send(burgers);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const newBurgerData: BurgerInterface = { ...data };
      const burgers = await BurgersModels.update<typeof id>({
        id,
        newBurgerData,
      });
      res.json(burgers);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
