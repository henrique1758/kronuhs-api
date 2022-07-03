import { Router } from "express";
import multer from "multer";
import upload from "../config/multer";
import { ensureDashboardUserAuthenticated } from "../middlewares/ensureDashboardUserAuthenticated";
import { is } from "../middlewares/permissions";
import { CreateDashboardUserController } from "../modules/dashboard/users/CreateDashboardUser/CreateDashboardUserController";
import { DeleteDashboardUserController } from "../modules/dashboard/users/DeleteDashboardUser/DeleteDashboardUserController";
import { FindAllUsersController } from "../modules/dashboard/users/FindAllUsers/FindAllUsersController";
import { ProfileDashboardUserController } from "../modules/dashboard/users/ProfileDashboardUser/ProfileDashboardUserController";
import { UpdateDashboardAvatarUserController } from "../modules/dashboard/users/UpdateDashboardAvatarUser/UpdateDashboardAvatarUserController";
import { UpdateDashboardUserController } from "../modules/dashboard/users/UpdateDashboardUser/UpdateDashboardUserController";

const userDashboardRoute = Router();

const findAllUsersController = new FindAllUsersController();
const createDashboardUserController = new CreateDashboardUserController();
const updateDashboardUserController = new UpdateDashboardUserController();
const deleteDashboardUserController = new DeleteDashboardUserController();
const updateDashboardAvatarUserController = new UpdateDashboardAvatarUserController();

const profileDashboardUserController = new ProfileDashboardUserController();

const uploadAvatar = multer(upload);

userDashboardRoute.get(
"/",
ensureDashboardUserAuthenticated,
is(["admin"]),
findAllUsersController.handle
);

userDashboardRoute.get(
"/profile",
ensureDashboardUserAuthenticated,
profileDashboardUserController.handle
);

userDashboardRoute.post(
"/",
ensureDashboardUserAuthenticated, 
is(["admin"]),
uploadAvatar.single("avatar"),
createDashboardUserController.handle);

userDashboardRoute.put(
"/update", 
ensureDashboardUserAuthenticated, 
updateDashboardUserController.handle);

userDashboardRoute.patch(
"/update/avatar",
ensureDashboardUserAuthenticated, 
uploadAvatar.single("avatar"),
updateDashboardAvatarUserController.handle
);

userDashboardRoute.delete(
"/delete/:id", 
ensureDashboardUserAuthenticated, 
is(["admin"]),
deleteDashboardUserController.handle);

export { userDashboardRoute as userDashboardRoutes };

