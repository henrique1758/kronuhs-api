import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileBlogUserUseCase } from "./ProfileBlogUserUseCase";

class ProfileBlogUserController {
  async handle(req:Request, res:Response): Promise<Response> {
    const { id } = req.user;

    const profileBlogUserUseCase = container.resolve(ProfileBlogUserUseCase);

    const result = await profileBlogUserUseCase.execute(id);

    return res.json(result);
  }
}

export { ProfileBlogUserController };

