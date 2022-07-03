import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateBlogUserAvatarUseCase } from "./UpdateBlogUserAvatarUseCase";

class UpdateBlogUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatarFile = req.file?.filename;

    const updateBlogUserAvatarUseCase = container.resolve(UpdateBlogUserAvatarUseCase);

    await updateBlogUserAvatarUseCase.execute({
      userId: id,
      avatarFile
    });

    return res.json({ message: "User avatar updated successfuly!" });
  }
}
export { UpdateBlogUserAvatarController };

