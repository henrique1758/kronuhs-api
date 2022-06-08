import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateDashboardUserUseCase } from './UpdateDashboardUserUseCase';

class UpdateDashboardUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const { firstName, lastName, email } = req.body;

    const updateDashboardUserUseCase = container.resolve(UpdateDashboardUserUseCase);

    await updateDashboardUserUseCase.execute({
      id,
      firstName,
      lastName,
      email
    });

    return res.json({ message: "User updated successfuly!" });
  }
}
export { UpdateDashboardUserController };

