import { Router } from "express";
import { ensureDashboardUserAuthenticated } from "../middlewares/ensureDashboardUserAuthenticated";
import { is } from "../middlewares/permissions";
import { CreateDashboardUserController } from "../modules/dashboard/users/CreateDashboardUser/CreateDashboardUserController";
import { DeleteDashboardUserController } from "../modules/dashboard/users/DeleteDashboardUser/DeleteDashboardUserController";
import { FindAllUsersController } from "../modules/dashboard/users/FindAllUsers/FindAllUsersController";
import { UpdateDashboardUserController } from "../modules/dashboard/users/UpdateDashboardUser/UpdateDashboardUserController";

const userDashboardRoute = Router();

const findAllUsersController = new FindAllUsersController();
const createDashboardUserController = new CreateDashboardUserController();
const updateDashboardUserController = new UpdateDashboardUserController();
const deleteDashboardUserController = new DeleteDashboardUserController();

userDashboardRoute.get(
"/",
ensureDashboardUserAuthenticated,
is(["admin"]),
findAllUsersController.handle
);

userDashboardRoute.post(
"/",
ensureDashboardUserAuthenticated, 
is(["admin"]), 
createDashboardUserController.handle);

userDashboardRoute.put(
"/update", 
ensureDashboardUserAuthenticated, 
updateDashboardUserController.handle);

userDashboardRoute.delete(
"/delete/:id", 
ensureDashboardUserAuthenticated, 
is(["admin"]),
deleteDashboardUserController.handle);

export { userDashboardRoute as userDashboardRoutes };

