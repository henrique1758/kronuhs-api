import { Router } from "express";
import { ensureBlogUserAuthenticated } from "../middlewares/ensureBlogUserAuthenticated";
import { CreateCommentController } from "../modules/blog/comments/CreateComment/CreateCommentController";
import { DeleteCommentController } from "../modules/blog/comments/DeleteComment/DeleteCommentController";
import { FindAllCommentsByPostController } from "../modules/blog/comments/FindAllCommentsByPost/FindAllCommentsByPostController";

const commentRoute = Router();

const findAllCommentsByPost = new FindAllCommentsByPostController();
const createCommentController = new CreateCommentController();
const deletCommentController = new DeleteCommentController();

commentRoute.get("/:id", findAllCommentsByPost.handle);
commentRoute.post("/:id", ensureBlogUserAuthenticated, createCommentController.handle);
commentRoute.delete("/:id", ensureBlogUserAuthenticated, deletCommentController.handle);

export { commentRoute as commentsRoutes };

