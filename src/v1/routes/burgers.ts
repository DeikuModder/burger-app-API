import { Router } from "express";
import { BurgersController } from "../../controllers/burgers";

const burgersRouter = Router();

burgersRouter
  .get("/", BurgersController.getAll)
  .get("/:id", BurgersController.getById)
  .post("/", BurgersController.create)
  .delete("/:id", BurgersController.delete)
  .put("/:id", BurgersController.update)
  .patch("/:id", BurgersController.update);

export default burgersRouter;
