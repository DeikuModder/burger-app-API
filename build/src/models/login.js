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
exports.LoginModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../schemas/user"));
dotenv_1.default.config();
class LoginModel {
    static login(userObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({ username: userObject.username });
                const isPasswordCorrect = user === null
                    ? false
                    : yield bcrypt_1.default.compare(userObject.passwordHash, user.passwordHash);
                if (!(user && isPasswordCorrect)) {
                    return { error: "Invalid user or password" };
                }
                const userForToken = {
                    id: user._id,
                    username: user.username,
                };
                const token = jsonwebtoken_1.default.sign(userForToken, process.env.SECRET);
                return {
                    username: user.username,
                    email: user.email,
                    token,
                };
            }
            catch (error) {
                console.error(error);
                mongoose_1.default.connection.close();
            }
        });
    }
}
exports.LoginModel = LoginModel;
