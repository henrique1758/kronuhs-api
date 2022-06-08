import { Router } from "express";
import { ensureDashboardUserAuthenticated } from "../middlewares/ensureDashboardUserAuthenticated";
import { is } from "../middlewares/permissions";
import {
  CreateRoleController
} from "../modules/dashboard/roles/CreateRole/CreateRoleController";

const roleDashboardRoute = Router();

const createRoleController = new CreateRoleController();

roleDashboardRoute.post(
"/", 
ensureDashboardUserAuthenticated,
is(["admin"]),
createRoleController.handle);

export { roleDashboardRoute as roleDashboardRoutes };

