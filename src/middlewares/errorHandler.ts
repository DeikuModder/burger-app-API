import { NextFunction, Response, Request } from "express";

class AppErrorHandler {
  static async errorHanlder(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err.name === "SyntaxError") {
      return res
        .status(400)
        .json({
          error: "Unexpected type of data, check if input all inputs are valid",
        });
    }
    next();
  }
}

export default AppErrorHandler;
