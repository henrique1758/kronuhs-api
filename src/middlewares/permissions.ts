import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";

export function is(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;

    const user = await prisma.user.findFirst({
      where: {
        id
      },
      include: {
        roles: true
      }
    });

    const roleIsValid = user?.roles
      .map(role => role.name)
      .some(role => roles.includes(role));
    
    if (!roleIsValid) {
      return res.status(401).end();
    }

    return next();
  }
}