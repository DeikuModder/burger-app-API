"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../../controllers/users");
const usersRouter = (0, express_1.Router)();
usersRouter.post("/", users_1.UsersController.register);
exports.default = usersRouter;
