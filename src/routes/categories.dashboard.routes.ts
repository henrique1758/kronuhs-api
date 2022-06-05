import { Router } from "express";
import { ensureDashboardUserAuthenticated } from "../middlewares/ensureDashboardUserAuthenticated";
import {
  CreateCategoryController
} from "../modules/dashboard/categories/CreateCategory/CreateCategoryController";

const categoryRoute = Router();

const createCategoryController = new CreateCategoryController();

categoryRoute.post("/", ensureDashboardUserAuthenticated, createCategoryController.handle);

export { categoryRoute as categoryRoutes };

