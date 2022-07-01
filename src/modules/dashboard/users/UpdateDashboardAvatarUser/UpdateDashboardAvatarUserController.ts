import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateDashboardAvatarUserUseCase } from "./UpdateDashboardAvatarUserUseCase";

class UpdateDashboardAvatarUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatarFile = req.file?.filename;

    const updateDashboardAvatarUserUseCase = container.resolve(UpdateDashboardAvatarUserUseCase);

    await updateDashboardAvatarUserUseCase.execute({
      userId: id,
      avatarFile
    });

    return res.json({ message: "User avatar updated successfuly!" })
  }
}
export { UpdateDashboardAvatarUserController };

