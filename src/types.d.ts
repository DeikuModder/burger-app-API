import mongoose from "mongoose";

export interface BurgerInterface {
  name: string;
  ingredients: string[];
  price: number;
  combos?: {
    content: string[] | null | undefined;
    price: number | null | undefined;
  };
}

export interface UserInterface {
  username: string;
  passwordHash: string;
  email: string;
}

export type LogedInUser = Omit<UserInterface, "email">;

export interface UserForToken {
  id: mongoose.Types.ObjectId;
  username: string;
}

export type UserReturnType =
  | UserInterface
  | UserInterface[]
  | { error?: string; code?: number };

export type BurgerGetAllResult =
  | BurgerInterface
  | BurgerInterface[]
  | { error?: string; code?: number }
  | { message?: string };
