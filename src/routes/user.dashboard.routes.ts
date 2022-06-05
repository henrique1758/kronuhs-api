import { Router } from "express";
import { CreateDashboardUserController } from "../modules/dashboard/users/CreateDashboardUser/CreateDashboardUserController";

const userDashboardRoute = Router();

const createDashboardUserController = new CreateDashboardUserController();

userDashboardRoute.post("/", createDashboardUserController.handle);

export { userDashboardRoute as userDashboardRoutes };
