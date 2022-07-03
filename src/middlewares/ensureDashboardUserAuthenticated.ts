import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "../config/auth";
import { AppError } from "../errors/AppError";
import { PrismaDashboardUserTokensRepository } from "../repositories/dashboardUserTokens/implementations/PrismaDashboardUserTokensRepository";

interface IPayload {
  sub: string;
}

async function ensureDashboardUserAuthenticated(
  req: Request, 
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;


  if (!authHeader) {
    throw new AppError({ error: true, code: "token.missing" }, 401);
  }

  const [, token] = authHeader?.split(" ");

  try {
    const { sub } = verify(token, authConfig.DASHBOARD_SECRET_KEY) as IPayload;

    req.user = {
      id: sub
    }

    next();
  } catch {
    throw new AppError({ error: true, code: "token.expired" }, 401);
  }
}

export { ensureDashboardUserAuthenticated };

