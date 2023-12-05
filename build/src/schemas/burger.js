"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const burgerSchema = new mongoose_1.Schema({
    name: String,
    ingredients: Array,
    price: Number,
    combos: {
        content: Array,
        price: Number,
    },
});
const Burger = (0, mongoose_1.model)("Burger", burgerSchema, "burguers_menu");
exports.default = Burger;
