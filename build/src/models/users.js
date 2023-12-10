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
exports.UsersModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../schemas/user"));
class UsersModel {
    static register(userObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkUsername = yield user_1.default.find({
                    username: userObject.username,
                });
                const checkEmail = yield user_1.default.find({
                    email: userObject.email,
                });
                if (checkUsername.length > 0 || checkEmail.length > 0) {
                    return { message: "Username or Email already exists" };
                }
                const user = new user_1.default(userObject);
                const newUser = yield user.save();
                return newUser;
            }
            catch (error) {
                console.error(error);
                mongoose_1.default.connection.close();
            }
        });
    }
}
exports.UsersModel = UsersModel;
