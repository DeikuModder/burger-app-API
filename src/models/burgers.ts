import mongoose from "mongoose";
import Burger from "../schemas/burger";
import { BurgerInterface } from "../types";
import { restartConnection } from "../utils";

export class BurgersModels {
  static async getAll<T>({ name }: { name: T }) {
    try {
      if (name) {
        const burgerByName: BurgerInterface[] | undefined = await Burger.find({
          name: name,
        });

        if (burgerByName.length <= 0) {
          return { error: "Burger not found" };
        }

        return burgerByName;
      }

      const burgers: BurgerInterface[] | undefined = await Burger.find();

      if (burgers.length <= 0) {
        return { error: "No burgers on DataBase" };
      }

      return burgers;
    } catch (error) {
      restartConnection();
      return { error: `${error}` };
    }
  }

  static async getById<T>({ id }: { id: T }) {
    try {
      const burgerById: BurgerInterface | null | undefined =
        await Burger.findById(id);

      if (burgerById === null) {
        return { error: "Burger not found" };
      }

      return burgerById;
    } catch (error) {
      restartConnection();
      return { error: `${error}` };
    }
  }

  static async create(newBurgerData: BurgerInterface) {
    try {
      const checkBurger: BurgerInterface[] | undefined = await Burger.find({
        name: newBurgerData.name,
        price: newBurgerData.price,
      });

      if (checkBurger.length > 0) {
        return { error: "Burger already exists" };
      }

      const newBurger = new Burger(newBurgerData);
      const result = await newBurger.save();
      return result;
    } catch (error) {
      restartConnection();
      return { error: `${error}` };
    }
  }

  static async delete<T>({ id }: { id: T }) {
    try {
      const burger = await Burger.findByIdAndDelete(id);

      if (burger) {
        return "Document deleted succesfully";
      }

      return { error: "Document doesn't exist" };
    } catch (error) {
      restartConnection();
      return { error: `${error}` };
    }
  }

  static async update<T>({
    id,
    newBurgerData,
  }: {
    id: T;
    newBurgerData: BurgerInterface;
  }) {
    try {
      const burger: BurgerInterface | null | undefined =
        await Burger.findByIdAndUpdate(id, newBurgerData, {
          new: true,
          runValidators: true,
        });

      if (burger) {
        return burger;
      } else {
        return { error: "Uknown error" };
      }
    } catch (error) {
      restartConnection();
      return { error: `${error}` };
    }
  }
}
