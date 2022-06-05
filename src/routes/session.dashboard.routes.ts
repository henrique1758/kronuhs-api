import { Router } from "express";
import {
  SessionController
} from "../modules/dashboard/session/SessionController";

const sessionDashboardRoute = Router();

const sessionController = new SessionController();

sessionDashboardRoute.post("/", sessionController.handle);

export { sessionDashboardRoute as sessionDashboardRoutes };

