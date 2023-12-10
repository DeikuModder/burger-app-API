import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserForToken } from "../types";

async function authAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.get("authorization");
    let token: string = "";
    let decodedToken: UserForToken;

    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
      token = authorization.substring(7);
    }

    decodedToken = jwt.verify(
      token,
      process.env.SECRET as jwt.Secret
    ) as UserForToken;

    if (decodedToken.username !== "Gab") {
      return res.status(405).send("You don't have admin permissions");
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .send("Token must be provided or you don't have admin permissions");
  }
}

export default authAdmin;
