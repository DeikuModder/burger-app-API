import { Schema, model } from "mongoose";

const burgerSchema = new Schema({
  name: String,
  ingredients: Array,
  price: Number,
  combos: {
    content: Array,
    price: Number,
  },
});

const Burger = model("Burger", burgerSchema, "burguers_menu");

export default Burger;
