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
exports.validateUserCredentials = exports.validatePartialInput = exports.validateInput = exports.validateEmptyInput = exports.restartConnection = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@burguer-app.nj6tkpl.mongodb.net/?retryWrites=true&w=majority`;
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
        yield connect();
    });
}
exports.connectDB = connectDB;
function restartConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        console.log("Restarting server...");
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield connectDB();
        }), 5000);
    });
}
exports.restartConnection = restartConnection;
function validateEmptyInput(burgerObject) {
    if (burgerObject.name === undefined &&
        burgerObject.price === undefined &&
        burgerObject.ingredients === undefined) {
        return false;
    }
    return true;
}
exports.validateEmptyInput = validateEmptyInput;
function validateInput(burgerObject) {
    if (typeof burgerObject.price !== "number" || burgerObject.price === null) {
        return false;
    }
    if (typeof burgerObject.name !== "string" || burgerObject.name === null) {
        return false;
    }
    if (!Array.isArray(burgerObject.ingredients || burgerObject.ingredients === null)) {
        return false;
    }
    if (burgerObject.ingredients.some((ingredient) => typeof ingredient !== "string")) {
        return false;
    }
    return true;
}
exports.validateInput = validateInput;
function validatePartialInput(burgerObject) {
    var _a;
    if ((burgerObject.name && typeof burgerObject.name !== "string") ||
        burgerObject.name === null) {
        return false;
    }
    if ((burgerObject.price && typeof burgerObject.price !== "number") ||
        burgerObject.price === null) {
        return false;
    }
    if (burgerObject.ingredients &&
        !Array.isArray(burgerObject.ingredients || burgerObject.ingredients === null)) {
        return false;
    }
    if ((_a = burgerObject.ingredients) === null || _a === void 0 ? void 0 : _a.some((ingredient) => typeof ingredient !== "string")) {
        return false;
    }
    return true;
}
exports.validatePartialInput = validatePartialInput;
function validateUserCredentials(userObject) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { username, passwordHash, email } = userObject;
    if (typeof username !== "string" ||
        username.length < 3 ||
        username === null) {
        return false;
    }
    if (typeof passwordHash !== "string" ||
        passwordHash.length < 6 ||
        passwordHash === null) {
        return false;
    }
    return emailRegex.test(email);
}
exports.validateUserCredentials = validateUserCredentials;
