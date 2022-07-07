import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDashboardUsersRepository } from "../../../../repositories/dashboardUsers/IDashboardUsersRepository";

interface IRequest {
  userIdToDelete: string;
  userIdLoggedIn: string;
}

@injectable()
class DeleteDashboardUserUseCase {
  constructor(
  @inject("PrismaUsersRepository")
  private usersRepository: IDashboardUsersRepository
  ) {}

  async execute({ userIdToDelete, userIdLoggedIn }: IRequest): Promise<void> {
    const userToDeleteExists = await this.usersRepository.findUserById(userIdToDelete);

    if (!userToDeleteExists) {
      throw new AppError("User does not exists!", 404);
    }

    if (userToDeleteExists.email === process.env.ADMIN_EMAIL) {
      throw new AppError("Unauthorized action!", 401);
    }

    if (userToDeleteExists.id === userIdLoggedIn) {
      throw new AppError("Unauthorized action!", 401);
    }

    await this.usersRepository.delete(userIdToDelete);
  }
}
export { DeleteDashboardUserUseCase };

