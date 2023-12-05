"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const burgers_1 = require("../controllers/burgers");
const burgersRouter = (0, express_1.Router)();
burgersRouter.get("/", burgers_1.BurgersController.getAll);
exports.default = burgersRouter;
