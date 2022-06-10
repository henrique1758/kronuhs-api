import { Router } from "express";
import multer from "multer";
import { multerConfig } from "../config/multer";
import { ensureDashboardUserAuthenticated } from "../middlewares/ensureDashboardUserAuthenticated";
import { is } from "../middlewares/permissions";
import {
  CreatePostController
} from "../modules/dashboard/posts/CreatePost/CreatePostController";
import { DeletePostController } from "../modules/dashboard/posts/DeletePost/DeletePostController";
import { FindAllPostsController } from "../modules/dashboard/posts/FindAllPosts/FindAllPostsController";
import { UpdateIsDraftPostController } from "../modules/dashboard/posts/UpdateIsDraftPost/UpdateIsDraftPostController";
import { UpdatePostController } from "../modules/dashboard/posts/UpdatePost/UpdatePostController";

const postRoute = Router();

const findAllPostsController = new FindAllPostsController();
const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();
const updateIsDraftPostController = new UpdateIsDraftPostController();
const deletePostController = new DeletePostController();

postRoute.get("/", findAllPostsController.handle);

postRoute.post(
"/",
ensureDashboardUserAuthenticated, 
is(["admin", "editor"]),
multer(multerConfig("postBg")).single("banner"),
createPostController.handle);

postRoute.put(
"/update/:id",
ensureDashboardUserAuthenticated,
is(["admin", "editor"]),
multer(multerConfig("postBg")).single("banner"),
updatePostController.handle);

postRoute.patch(
"/update/:id/draft",
ensureDashboardUserAuthenticated,
is(["admin", "editor"]),
updateIsDraftPostController.handle);

postRoute.delete(
"/delete/:id",
ensureDashboardUserAuthenticated,
is(["admin"]),
deletePostController.handle);

export { postRoute as postsRoutes };
