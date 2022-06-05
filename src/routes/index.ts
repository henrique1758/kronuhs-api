import { Router } from "express";
import { categoryRoutes } from "./categories.dashboard.routes";
import { roleDashboardRoutes } from "./roles.dashboard.routes";
import { sessionBlogRoutes } from "./session.blog.routes";
import { sessionDashboardRoutes } from "./session.dashboard.routes";
import { userBlogRoutes } from "./user.blog.routes";
import { userDashboardRoutes } from "./user.dashboard.routes";

const router = Router();

router.use("/blog/users", userBlogRoutes);
router.use("/blog/session", sessionBlogRoutes);

router.use("/dashboard/users", userDashboardRoutes);
router.use("/dashboard/categories", categoryRoutes);
router.use("/dashboard/session", sessionDashboardRoutes);
router.use("/dashboard/roles", roleDashboardRoutes);

export { router as routes };

