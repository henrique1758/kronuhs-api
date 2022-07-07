import { Router } from "express";
import { CreateViewController } from "../modules/blog/views/CreateView/CreateViewController";

const viewRoute = Router();

const createViewController = new CreateViewController();

viewRoute.post("/:id", createViewController.handle);

export { viewRoute as viewsRoutes };

