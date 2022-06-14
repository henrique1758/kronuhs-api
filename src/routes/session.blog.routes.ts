import { Router } from "express";
import { RefreshTokenController } from "../modules/blog/refreshToken/RefreshTokenController";
import {
  SessionWithEmailAndPasswordController
} from "../modules/blog/session/SessionWithEmailAndPassword/SessionWithEmailAndPasswordController";
import { SessionWithGithubController } from "../modules/blog/session/SessionWithGithub/SessionWithGithubController";

const sessionBlogRoute = Router();

const sessionWithEmailAndPasswordController = new SessionWithEmailAndPasswordController();
const sessionWithGithubController = new SessionWithGithubController();
const refreshTokenController = new RefreshTokenController();

// Github
sessionBlogRoute.get("/github", (req, res) => {
  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  )
});

sessionBlogRoute.post("/auth-github", sessionWithGithubController.handle);

sessionBlogRoute.get("/callback", (req, res) => {
  const { code } = req.query;

  return res.json(code);
});

// E-mail and Password, Refresh Token
sessionBlogRoute.post("/", sessionWithEmailAndPasswordController.handle);
sessionBlogRoute.post("/refresh-token", refreshTokenController.handle);

export { sessionBlogRoute as sessionBlogRoutes };

