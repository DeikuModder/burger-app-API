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
const burger_1 = __importDefault(require("../schemas/burger"));
const utils_1 = require("../utils");
class BurgersModels {
    static getAll({ name }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (name) {
                    const burgerByName = yield burger_1.default.find({
                        name: name,
                    });
                    if (burgerByName.length <= 0) {
                        return { error: "Burger not found" };
                    }
                    return burgerByName;
                }
                const burgers = yield burger_1.default.find();
                if (burgers.length <= 0) {
                    return { error: "No burgers on DataBase" };
                }
                return burgers;
            }
            catch (error) {
                (0, utils_1.restartConnection)();
                return { error: `${error}` };
            }
        });
    }
    static getById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const burgerById = yield burger_1.default.findById(id);
                if (burgerById === null) {
                    return { error: "Burger not found" };
                }
                return burgerById;
            }
            catch (error) {
                (0, utils_1.restartConnection)();
                return { error: `${error}` };
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
                    return { error: "Burger already exists" };
                }
                const newBurger = new burger_1.default(newBurgerData);
                const result = yield newBurger.save();
                return result;
            }
            catch (error) {
                (0, utils_1.restartConnection)();
                return { error: `${error}` };
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
                return { error: "Document doesn't exist" };
            }
            catch (error) {
                (0, utils_1.restartConnection)();
                return { error: `${error}` };
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
                    return { error: "Uknown error" };
                }
            }
            catch (error) {
                (0, utils_1.restartConnection)();
                return { error: `${error}` };
            }
        });
    }
}
exports.BurgersModels = BurgersModels;
