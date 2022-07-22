import { Router } from "express";
import { ensureDashboardUserAuthenticated } from "../middlewares/ensureDashboardUserAuthenticated";
import { is } from "../middlewares/permissions";
import { FindAllMetricsController } from "../modules/dashboard/metrics/FindAllMetrics/FindAllMetricsController";

const metricsRoutes = Router();

const findAllMetricsController = new FindAllMetricsController();

metricsRoutes.get(
"/",
ensureDashboardUserAuthenticated,
is(["admin"]),
findAllMetricsController.handle
)

export { metricsRoutes };
