"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
//in case of only authorize following url to fetch data
const corsMiddleware = () => (0, cors_1.default)({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            "http://127.0.0.1:5500",
            "http://localhost:1235",
        ];
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        if (!origin) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
});
exports.corsMiddleware = corsMiddleware;
