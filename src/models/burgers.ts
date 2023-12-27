import Burger from "../schemas/burger";
import { BurgerGetAllResult, BurgerInterface } from "../types";
import {
  restartConnection,
  validateEmptyInput,
  validateInput,
  validatePartialInput,
} from "../utils";
export class BurgersModels {
  static async getAll<T>({ name }: { name: T }): Promise<BurgerGetAllResult> {
    try {
      if (name) {
        const burgerByName: BurgerInterface[] | undefined = await Burger.find({
          name: name,
        });

        if (burgerByName.length <= 0) {
          return { error: "Burger not found", code: 404 };
        }

        return burgerByName;
      }

      const burgers: BurgerInterface[] | undefined = await Burger.find();

      if (burgers.length <= 0) {
        return { error: "No burgers on DataBase", code: 404 };
      }

      return burgers;
    } catch (error) {
      restartConnection();
      return { error: `${error}` };
    }
  }

  static async getById<T>({ id }: { id: T }): Promise<BurgerGetAllResult> {
    try {
      const burgerById: BurgerInterface | null = await Burger.findById(id);

      if (burgerById === null) {
        return { error: "Burger not found", code: 404 };
      }

      return burgerById;
    } catch (error) {
      restartConnection();
      return { error: `${error}` };
    }
  }

  static async create(
    newBurgerData: BurgerInterface
  ): Promise<BurgerGetAllResult> {
    try {
      const checkEmpty = validateEmptyInput(newBurgerData);
      const checkInput = validateInput(newBurgerData);

      if (!checkEmpty)
        return { error: "Please fill out at least one field", code: 400 };
      if (!checkInput)
        return {
          error: "Invalid or non existing input, all inputs must be filled",
          code: 422,
        };

      const checkBurger: BurgerInterface[] | undefined = await Burger.find({
        name: newBurgerData.name,
        price: newBurgerData.price,
      });

      if (checkBurger.length > 0) {
        return { error: "Burger already exists", code: 422 };
      }

      const newBurger = new Burger(newBurgerData);

      const result = (await newBurger.save()) as BurgerInterface;
      return result;
    } catch (error) {
      restartConnection();
      return { error: `${error}` };
    }
  }

  static async delete<T>({ id }: { id: T }): Promise<BurgerGetAllResult> {
    try {
      const burger = await Burger.findByIdAndDelete(id);

      if (burger) {
        return { message: "Document deleted succesfully" };
      }

      return { error: "Document doesn't exist", code: 404 };
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
      const checkEmpty = validateEmptyInput(newBurgerData);
      const checkInput = validatePartialInput(newBurgerData);

      if (!checkEmpty)
        return { error: "Please fill out at least one field", code: 400 };

      if (!checkInput) return { error: "Invalid input type", code: 422 };

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
