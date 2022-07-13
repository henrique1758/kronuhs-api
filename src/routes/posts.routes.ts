import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/multer";
import { ensureDashboardUserAuthenticated } from "../middlewares/ensureDashboardUserAuthenticated";
import { is } from "../middlewares/permissions";
import {
  CreatePostController
} from "../modules/dashboard/posts/CreatePost/CreatePostController";
import { DeletePostController } from "../modules/dashboard/posts/DeletePost/DeletePostController";
import { FindAllPostsController } from "../modules/dashboard/posts/FindAllPosts/FindAllPostsController";
import { FindAllPostsByCategoryController } from "../modules/dashboard/posts/FindAllPostsByCategory/FindAllPostsByCategoryController";
import { FindPostByIdController } from "../modules/dashboard/posts/FindPostById/FindPostByIdController";
import { FindPostBySlugController } from "../modules/dashboard/posts/FindPostBySlug/FindPostBySlugController";
import { UpdateIsDraftPostController } from "../modules/dashboard/posts/UpdateIsDraftPost/UpdateIsDraftPostController";
import { UpdatePostController } from "../modules/dashboard/posts/UpdatePost/UpdatePostController";

const postRoute = Router();

const findAllPostsController = new FindAllPostsController();
const findAllPostsByCategoryController = new FindAllPostsByCategoryController();
const findPostBySlugController = new FindPostBySlugController();
const findPostByIdController = new FindPostByIdController();
const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();
const updateIsDraftPostController = new UpdateIsDraftPostController();
const deletePostController = new DeletePostController();

const upload = multer(uploadConfig);

postRoute.get("/", findAllPostsController.handle);

postRoute.get("/:category", findAllPostsByCategoryController.handle);

postRoute.get("/:slug", findPostBySlugController.handle);

postRoute.get("/:id", findPostByIdController.handle);

postRoute.post(
"/",
ensureDashboardUserAuthenticated, 
is(["admin", "editor"]),
upload.single("banner"),
createPostController.handle);

postRoute.put(
"/update/:id",
ensureDashboardUserAuthenticated,
is(["admin", "editor"]),
upload.single("banner"),
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
