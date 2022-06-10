import { Router } from "express";
import { ensureBlogUserAuthenticated } from "../middlewares/ensureBlogUserAuthenticated";
import { CreateViewController } from "../modules/blog/views/CreateView/CreateViewController";

const viewRoute = Router();

const createViewController = new CreateViewController();

viewRoute.post("/:id", ensureBlogUserAuthenticated, createViewController.handle);

export { viewRoute as viewsRoutes };

