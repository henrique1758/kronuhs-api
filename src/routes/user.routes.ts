import { Router } from "express";
import { CreateUserController } from "../modules/users/CreateUser/CreateUserController";

const userRoute = Router();

const createUserController = new CreateUserController();

userRoute.post("/", createUserController.handle);

export { userRoute as userRoutes };
