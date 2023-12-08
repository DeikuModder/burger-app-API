import { Router } from "express";
import { UsersController } from "../../controllers/users";

const usersRouter = Router();

usersRouter.post("/", UsersController.createUser);

export default usersRouter;
