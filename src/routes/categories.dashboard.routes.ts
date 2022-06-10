import { Router } from "express";
import { ensureDashboardUserAuthenticated } from "../middlewares/ensureDashboardUserAuthenticated";
import { is } from "../middlewares/permissions";
import {
  CreateCategoryController
} from "../modules/dashboard/categories/CreateCategory/CreateCategoryController";
import { DeleteCategoryController } from "../modules/dashboard/categories/DeleteCategory/DeleteCategoryController";
import { FindAllCategoriesController } from "../modules/dashboard/categories/FindAllCategories/FindAllCategoriesController";

const categoryRoute = Router();

const createCategoryController = new CreateCategoryController();
const findAllCategoriesController = new FindAllCategoriesController();
const deleteCategoryController = new DeleteCategoryController();

categoryRoute.get("/", findAllCategoriesController.handle);

categoryRoute.post(
"/", 
ensureDashboardUserAuthenticated, 
is(["admin", "editor"]),
createCategoryController.handle);

categoryRoute.delete(
"/delete/:id", 
ensureDashboardUserAuthenticated, 
is(["admin"]),
deleteCategoryController.handle);

export { categoryRoute as categoryRoutes };

