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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authorization = req.get("authorization");
            let token = "";
            let decodedToken;
            if (authorization && authorization.toLowerCase().startsWith("bearer")) {
                token = authorization.substring(7);
            }
            decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            if (decodedToken.username !== "Gab") {
                return res.status(405).send("You don't have admin permissions");
            }
            next();
        }
        catch (error) {
            return res
                .status(401)
                .send("Token must be provided or you don't have admin permissions");
        }
    });
}
exports.default = authAdmin;
