import { Router } from "express";
import { ResetPasswordUserController } from "../modules/dashboard/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "../modules/dashboard/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordDashboardRoute = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordDashboardRoute.post("/forgot", sendForgotPasswordMailController.handle);
passwordDashboardRoute.post("/reset", resetPasswordUserController.handle);

export { passwordDashboardRoute as passwordDashboardRoutes };
