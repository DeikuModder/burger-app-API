import mongoose from "mongoose";
import Burger from "../schemas/burger";
const uri =
  "mongodb+srv://Gabriel:putongo55555@burguer-app.nj6tkpl.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri, {
      dbName: "burguers",
    });
    console.log("Connected to Database!");
  } catch (error) {
    console.error(error);
  }
}

connect();

export class BurgersModels {
  static async getAll() {
    try {
      const burgers = await Burger.find();
      return burgers;
    } catch (error) {
      console.error(error);
    }
  }
}
