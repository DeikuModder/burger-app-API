"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const burgers_1 = require("../../controllers/burgers");
const authAdmin_1 = __importDefault(require("../../middlewares/authAdmin"));
const burgersRouter = (0, express_1.Router)();
burgersRouter
    .get("/", burgers_1.BurgersController.getAll)
    .get("/:id", burgers_1.BurgersController.getById);
burgersRouter.use(authAdmin_1.default);
burgersRouter
    .post("/", burgers_1.BurgersController.create)
    .delete("/:id", burgers_1.BurgersController.delete)
    .put("/:id", burgers_1.BurgersController.update)
    .patch("/:id", burgers_1.BurgersController.update);
exports.default = burgersRouter;
