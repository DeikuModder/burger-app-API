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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BurgersController = void 0;
const burgers_1 = require("../models/burgers");
class BurgersController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.query;
                const burgers = yield burgers_1.BurgersModels.getAll({ name });
                burgers.hasOwnProperty("error")
                    ? res.status(400).json(burgers)
                    : res.json(burgers);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const burgers = yield burgers_1.BurgersModels.getById({ id });
                (burgers === null || burgers === void 0 ? void 0 : burgers.hasOwnProperty("error"))
                    ? res.status(400).json(burgers)
                    : res.json(burgers);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { name, price } = _a, data = __rest(_a, ["name", "price"]);
                const newBurger = Object.assign({ name, price }, data);
                const burgers = yield burgers_1.BurgersModels.create(newBurger);
                (burgers === null || burgers === void 0 ? void 0 : burgers.hasOwnProperty("error"))
                    ? res.status(400).json(burgers)
                    : res.json(burgers);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const burgers = yield burgers_1.BurgersModels.delete({ id });
                burgers.hasOwnProperty("error")
                    ? res.status(400).json(burgers)
                    : res.json(burgers);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const newBurgerData = Object.assign({}, data);
                const burgers = yield burgers_1.BurgersModels.update({
                    id,
                    newBurgerData,
                });
                burgers.hasOwnProperty("error")
                    ? res.status(400).json(burgers)
                    : res.json(burgers);
            }
            catch (error) {
                res.status(500).send(`${error}`);
            }
        });
    }
}
exports.BurgersController = BurgersController;
