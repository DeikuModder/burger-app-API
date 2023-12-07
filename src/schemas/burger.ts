import { Schema, model } from "mongoose";

const burgerSchema = new Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  price: { type: Number, required: true },
  combos: {
    content: { type: [String], required: false },
    price: { type: Number },
  },
});

const Burger = model("Burger", burgerSchema, "burguers_menu");

export default Burger;
