"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BurgersModels = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const burger_1 = __importDefault(require("../schemas/burger"));
class BurgersModels {
    static getAll({ name }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (name) {
                    const burgerByName = yield burger_1.default.find({
                        name: name,
                    });
                    if (burgerByName.length <= 0) {
                        return { message: "Burger not found" };
                    }
                    return burgerByName;
                }
                const burgers = yield burger_1.default.find();
                if (burgers.length <= 0) {
                    return { message: "No burgers on DataBase" };
                }
                return burgers;
            }
            catch (error) {
                console.error(error);
                mongoose_1.default.connection.close();
            }
        });
    }
    static getById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const burgerById = yield burger_1.default.findById(id);
                if (burgerById === null) {
                    return { message: "Burger not found" };
                }
                return burgerById;
            }
            catch (error) {
                console.error(error);
                mongoose_1.default.connection.close();
            }
        });
    }
    static create(newBurgerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkBurger = yield burger_1.default.find({
                    name: newBurgerData.name,
                    price: newBurgerData.price,
                });
                if (checkBurger.length > 0) {
                    return { message: "Burger already exists" };
                }
                const newBurger = new burger_1.default(newBurgerData);
                const result = yield newBurger.save();
                return result;
            }
            catch (error) {
                console.error(error);
                mongoose_1.default.connection.close();
            }
        });
    }
    static delete({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const burger = yield burger_1.default.findByIdAndDelete(id);
                if (burger) {
                    return "Document deleted succesfully";
                }
                return "Document doesn't exist";
            }
            catch (error) {
                console.error(error);
                mongoose_1.default.connection.close();
            }
        });
    }
    static update({ id, newBurgerData, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const burger = yield burger_1.default.findByIdAndUpdate(id, newBurgerData, {
                    new: true,
                    runValidators: true,
                });
                if (burger) {
                    return burger;
                }
                else {
                    return { message: "Error has ocurred" };
                }
            }
            catch (error) {
                console.error(error);
                mongoose_1.default.connection.close();
            }
        });
    }
}
exports.BurgersModels = BurgersModels;
