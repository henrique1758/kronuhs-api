import { Router } from "express";
import { ensureBlogUserAuthenticated } from "../middlewares/ensureBlogUserAuthenticated";
import { CreateLikeController } from "../modules/blog/likes/CreateLike/CreateLikeController";
import { DeleteLikeController } from "../modules/blog/likes/DeleteLike/DeleteLikeController";

const likeRoute = Router();

const createLikeController = new CreateLikeController();
const deletLikeController = new DeleteLikeController();

likeRoute.post("/:id", ensureBlogUserAuthenticated, createLikeController.handle);
likeRoute.delete("/:id", ensureBlogUserAuthenticated, deletLikeController.handle);

export { likeRoute as likesRoutes };
