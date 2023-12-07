"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const burgers_1 = require("../../controllers/burgers");
const burgersRouter = (0, express_1.Router)();
burgersRouter
    .get("/", burgers_1.BurgersController.getAll)
    .get("/:id", burgers_1.BurgersController.getById)
    .post("/", burgers_1.BurgersController.create)
    .delete("/:id", burgers_1.BurgersController.delete)
    .put("/:id", burgers_1.BurgersController.update)
    .patch("/:id", burgers_1.BurgersController.update);
exports.default = burgersRouter;
