import { Router } from "express";
import { ensureDashboardUserAuthenticated } from "../middlewares/ensureDashboardUserAuthenticated";
import { is } from "../middlewares/permissions";
import {
  CreateRoleController
} from "../modules/dashboard/roles/CreateRole/CreateRoleController";
import { FindAllRolesController } from "../modules/dashboard/roles/FindAllRoles/FindAllRolesController";

const roleDashboardRoute = Router();

const createRoleController = new CreateRoleController();
const findAllRolesController = new FindAllRolesController();

roleDashboardRoute.post(
"/", 
ensureDashboardUserAuthenticated,
is(["admin"]),
createRoleController.handle);

roleDashboardRoute.get("/", findAllRolesController.handle)

export { roleDashboardRoute as roleDashboardRoutes };

