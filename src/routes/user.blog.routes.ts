import { Router } from "express";
import { ensureBlogUserAuthenticated } from "../middlewares/ensureBlogUserAuthenticated";
import { CreateBlogUserController } from "../modules/blog/users/CreateBlogUser/CreateBlogUserController";
import { ProfileBlogUserController } from "../modules/blog/users/ProfileBlogUser/ProfileBlogUserController";

const userBlogRoute = Router();

const profileBlogUserController = new ProfileBlogUserController();
const createBlogUserController = new CreateBlogUserController();

userBlogRoute.get(
"/profile", 
ensureBlogUserAuthenticated,
profileBlogUserController.handle);

userBlogRoute.post("/", createBlogUserController.handle);

export { userBlogRoute as userBlogRoutes };

