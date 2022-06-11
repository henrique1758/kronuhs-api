import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "../config/auth";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

async function ensureBlogUserAuthenticated(
  req: Request, 
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token is missing!" })
  }

  const [, token] = authHeader?.split(" ");

  try {
    const { sub } = verify(token, authConfig.BLOG_SECRET_KEY) as IPayload;

    req.user = {
      id: sub
    }

    next();
  } catch {
    throw new AppError("Token is invalid!")
  }
}

export { ensureBlogUserAuthenticated };

