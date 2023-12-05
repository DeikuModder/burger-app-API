import express from "express";
import { corsMiddleware } from "./src/middlewares/cors";
import burgersRouter from "./src/routes/burgers";

const PORT = process.env.PORT || 1235;
const app = express();

app.disable("x-powered-by");
app.use(corsMiddleware());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.use("/burgers", burgersRouter);

app.use((_req, res) => {
  res.status(404).send("404 not found");
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
