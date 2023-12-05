import { Router } from "express";
import { BurgersController } from "../controllers/burgers";

const burgersRouter = Router();

burgersRouter.get("/", BurgersController.getAll);

export default burgersRouter;
