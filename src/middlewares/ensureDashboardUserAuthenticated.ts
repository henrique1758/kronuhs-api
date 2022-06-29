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

  const userTokensRepository = new PrismaDashboardUserTokensRepository();

  if (!authHeader) {
    throw new AppError("Token is missing!", 401);
  }

  const [, token] = authHeader?.split(" ");

  try {
    const { sub } = verify(token, authConfig.DASHBOARD_REFRESH_SECRET) as IPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      sub,
      token
    );

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    req.user = {
      id: sub
    }

    next();
  } catch {
    throw new AppError("Token is invalid!", 401);
  }
}

export { ensureDashboardUserAuthenticated };

