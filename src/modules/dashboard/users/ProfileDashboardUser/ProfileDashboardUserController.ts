import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileDashboardUserUseCase } from "./ProfileDashboardUserUseCase";

class ProfileDashboardUserController {
  async handle(req: Request, res: Response): Promise<Response> {
     const { id } = req.user;

     const profileDashboardUserUseCase = container.resolve(ProfileDashboardUserUseCase);

     const result = await profileDashboardUserUseCase.execute(id);

     return res.json(result)
  }
}
export { ProfileDashboardUserController };
