import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteDashboardUserUseCase } from './DeleteDashboardUserUseCase';

class DeleteDashboardUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userIdLoggedIn } = req.user;

    const { id: userIdToDelete } = req.params

    const deleteDashboardUserUseCase = container.resolve(DeleteDashboardUserUseCase);

    await deleteDashboardUserUseCase.execute({
      userIdToDelete,
      userIdLoggedIn
    });

    return res.json({ message: "User deleted successfuly!" });
  }
}
export { DeleteDashboardUserController };

