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
exports.restartConnection = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
function connectDB() {
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
    connect();
}
exports.connectDB = connectDB;
function restartConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        setTimeout(() => {
            connectDB();
        }, 5000);
    });
}
exports.restartConnection = restartConnection;
