import mongoose from "mongoose";
import dotenv from "dotenv";
import { BurgerInterface, UserInterface } from "./types";

export async function connectDB() {
  dotenv.config();

  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@burguer-app.nj6tkpl.mongodb.net/?retryWrites=true&w=majority`;

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

  await connect();
}

export async function restartConnection() {
  await mongoose.disconnect();
  console.log("Restarting server...");
  setTimeout(async () => {
    await connectDB();
  }, 5000);
}

export function validateEmptyInput(burgerObject: Partial<BurgerInterface>) {
  if (
    burgerObject.name === undefined &&
    burgerObject.price === undefined &&
    burgerObject.ingredients === undefined
  ) {
    return false;
  }

  return true;
}

export function validateInput(burgerObject: BurgerInterface) {
  if (typeof burgerObject.price !== "number" || burgerObject.price === null) {
    return false;
  }
  if (typeof burgerObject.name !== "string" || burgerObject.name === null) {
    return false;
  }

  if (
    !Array.isArray(
      burgerObject.ingredients || burgerObject.ingredients === null
    )
  ) {
    return false;
  }

  if (
    burgerObject.ingredients.some(
      (ingredient) => typeof ingredient !== "string"
    )
  ) {
    return false;
  }

  return true;
}

export function validatePartialInput(burgerObject: Partial<BurgerInterface>) {
  if (
    (burgerObject.name && typeof burgerObject.name !== "string") ||
    burgerObject.name === null
  ) {
    return false;
  }

  if (
    (burgerObject.price && typeof burgerObject.price !== "number") ||
    burgerObject.price === null
  ) {
    return false;
  }

  if (
    burgerObject.ingredients &&
    !Array.isArray(
      burgerObject.ingredients || burgerObject.ingredients === null
    )
  ) {
    return false;
  }

  if (
    burgerObject.ingredients?.some(
      (ingredient) => typeof ingredient !== "string"
    )
  ) {
    return false;
  }

  return true;
}

export function validateUserCredentials(userObject: UserInterface) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const { username, passwordHash, email } = userObject;
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username === null
  ) {
    return false;
  }
  if (
    typeof passwordHash !== "string" ||
    passwordHash.length < 6 ||
    passwordHash === null
  ) {
    return false;
  }
  return emailRegex.test(email);
}
