import { Router } from "express";
import {
  SessionWithEmailAndPasswordController
} from "../modules/blog/session/SessionWithEmailAndPassword/SessionWithEmailAndPasswordController";

const sessionBlogRoute = Router();

const sessionWithEmailAndPasswordController = new SessionWithEmailAndPasswordController();

sessionBlogRoute.post("/", sessionWithEmailAndPasswordController.handle);

export { sessionBlogRoute as sessionBlogRoutes };

