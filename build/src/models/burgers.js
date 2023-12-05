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
const uri = "mongodb+srv://Gabriel:putongo55555@burguer-app.nj6tkpl.mongodb.net/?retryWrites=true&w=majority";
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(uri, {
                dbName: "burguers",
            });
            console.log("Connected to Database!");
        }
        catch (error) {
            console.error(error);
        }
    });
}
connect();
class BurgersModels {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const burgers = yield burger_1.default.find();
                return burgers;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.BurgersModels = BurgersModels;
