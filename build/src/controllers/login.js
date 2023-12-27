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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const login_1 = require("../models/login");
class LoginController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const userObject = {
                    username,
                    passwordHash: password,
                };
                const checkUser = yield login_1.LoginModel.login(userObject);
                "error" in checkUser
                    ? res.status(checkUser.code).json(checkUser.error)
                    : res.json(checkUser);
            }
            catch (error) {
                res.status(500).send(`${error}`);
            }
        });
    }
}
exports.LoginController = LoginController;
