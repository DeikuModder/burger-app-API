import mongoose from "mongoose";
import Burger from "../schemas/burger";
import { BurgerInterface } from "../types";
export class BurgersModels {
  static async getAll<T>({ name }: { name: T }) {
    try {
      if (name) {
        const burgerByName: BurgerInterface[] | undefined = await Burger.find({
          name: name,
        });

        if (burgerByName.length <= 0) {
          return { message: "Burger not found" };
        }

        return burgerByName;
      }

      const burgers: BurgerInterface[] | undefined = await Burger.find();

      if (burgers.length <= 0) {
        return { message: "No burgers on DataBase" };
      }

      return burgers;
    } catch (error) {
      console.error(error);
      mongoose.connection.close();
    }
  }

  static async getById<T>({ id }: { id: T }) {
    try {
      const burgerById: BurgerInterface | null | undefined =
        await Burger.findById(id);

      if (burgerById === null) {
        return { message: "Burger not found" };
      }

      return burgerById;
    } catch (error) {
      console.error(error);
      mongoose.connection.close();
    }
  }

  static async create(newBurgerData: BurgerInterface) {
    try {
      const checkBurger: BurgerInterface[] | undefined = await Burger.find({
        name: newBurgerData.name,
        price: newBurgerData.price,
      });

      if (checkBurger.length > 0) {
        return { message: "Burger already exists" };
      }

      const newBurger = new Burger(newBurgerData);
      const result = await newBurger.save();
      return result;
    } catch (error) {
      console.error(error);
      mongoose.connection.close();
    }
  }

  static async delete<T>({ id }: { id: T }) {
    try {
      const burger = await Burger.findByIdAndDelete(id);

      if (burger) {
        return "Document deleted succesfully";
      }

      return "Document doesn't exist";
    } catch (error) {
      console.error(error);
      mongoose.connection.close();
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
        return { message: "Error has ocurred" };
      }
    } catch (error) {
      console.error(error);
      mongoose.connection.close();
    }
  }
}
