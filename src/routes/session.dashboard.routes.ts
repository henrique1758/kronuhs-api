import { Router } from "express";
import { RefreshTokenController } from "../modules/dashboard/refreshToken/RefreshTokenController";
import {
  SessionController
} from "../modules/dashboard/session/SessionController";

const sessionDashboardRoute = Router();

const sessionController = new SessionController();
const refreshTokenController = new RefreshTokenController();

sessionDashboardRoute.post("/", sessionController.handle);
sessionDashboardRoute.post("/refresh-token", refreshTokenController.handle);

export { sessionDashboardRoute as sessionDashboardRoutes };

