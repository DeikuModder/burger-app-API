import express, { NextFunction } from "express";
import cors from "cors";
import burgersRouter from "./src/v1/routes/burgers";
import usersRouter from "./src/v1/routes/users";
import loginRouter from "./src/v1/routes/login";
import HomeMessage from "./src/welcomeMessage";
import { connectDB } from "./src/utils";
import AppErrorHandler from "./src/middlewares/errorHandler";

const PORT = process.env.PORT || 1235;
const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send(HomeMessage);
});

connectDB();

app.use(AppErrorHandler.errorHanlder);

app.use("/api/v1/burgers", burgersRouter);
app.use("/api/v1/users", usersRouter);
app.use("/login", loginRouter);

app.use((_req, res) => {
  res.status(404).send("404 not found");
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
