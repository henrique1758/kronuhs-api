import { Router } from "express";
import { ensureBlogUserAuthenticated } from "../middlewares/ensureBlogUserAuthenticated";
import { CreateCommentController } from "../modules/blog/comments/CreateComment/CreateCommentController";
import { DeleteCommentController } from "../modules/blog/comments/DeleteComment/DeleteCommentController";

const commentRoute = Router();

const createCommentController = new CreateCommentController();
const deletCommentController = new DeleteCommentController();

commentRoute.post("/:id", ensureBlogUserAuthenticated, createCommentController.handle);
commentRoute.delete("/:id", ensureBlogUserAuthenticated, deletCommentController.handle);

export { commentRoute as commentsRoutes };

