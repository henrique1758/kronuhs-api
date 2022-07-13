import { Router } from "express";
import { SubscribeNewsletterController } from "../modules/blog/newsletter/subscribeNewsletter/SubscribeNewsletterController";

const newsletterRoute = Router();

const subscribeNewsletterController = new SubscribeNewsletterController();

newsletterRoute.post("/", subscribeNewsletterController.handle);

export { newsletterRoute as newsletterRoutes };