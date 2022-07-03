import { Router } from "express";
import multer from "multer";

import upload from "../config/multer";

import { ensureBlogUserAuthenticated } from "../middlewares/ensureBlogUserAuthenticated";
import { CreateBlogUserController } from "../modules/blog/users/CreateBlogUser/CreateBlogUserController";
import { ProfileBlogUserController } from "../modules/blog/users/ProfileBlogUser/ProfileBlogUserController";
import { UpdateBlogUserAvatarController } from "../modules/blog/users/UpdateBlogUserAvatar/UpdateBlogUserAvatarController";

const userBlogRoute = Router();

const uploadAvatar = multer(upload);

const profileBlogUserController = new ProfileBlogUserController();
const createBlogUserController = new CreateBlogUserController();
const updateBlogUserAvatarController = new UpdateBlogUserAvatarController();

userBlogRoute.get(
"/profile", 
ensureBlogUserAuthenticated,
profileBlogUserController.handle);

userBlogRoute.post("/", createBlogUserController.handle);

userBlogRoute.patch(
"/update/avatar",
ensureBlogUserAuthenticated, 
uploadAvatar.single("avatar"),
updateBlogUserAvatarController.handle
);

export { userBlogRoute as userBlogRoutes };

