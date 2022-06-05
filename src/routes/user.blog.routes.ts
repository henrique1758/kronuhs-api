import { Router } from "express";
import { CreateBlogUserController } from "../modules/blog/users/CreateBlogUser/CreateBlogUserController";

const userBlogRoute = Router();

const createBlogUserController = new CreateBlogUserController();

userBlogRoute.post("/", createBlogUserController.handle);

export { userBlogRoute as userBlogRoutes };

