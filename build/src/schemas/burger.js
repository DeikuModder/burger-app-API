"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const burgerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    price: { type: Number, required: true },
    combos: {
        content: { type: [String], required: false },
        price: { type: Number },
    },
});
const Burger = (0, mongoose_1.model)("Burger", burgerSchema, "burguers_menu");
exports.default = Burger;
