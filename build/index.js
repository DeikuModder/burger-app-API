"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = require("./src/middlewares/cors");
const burgers_1 = __importDefault(require("./src/v1/routes/burgers"));
const PORT = process.env.PORT || 1235;
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use((0, cors_1.corsMiddleware)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Hello World");
});
app.use("/api/v1/burgers", burgers_1.default);
app.use((_req, res) => {
    res.status(404).send("404 not found");
});
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
