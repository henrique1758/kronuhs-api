import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../../../repositories/users/IUsersRepository';

interface IRequest {
  userIdToDelete: string;
  userIdLoggedIn: string;
}

@injectable()
class DeleteDashboardUserUseCase {
  constructor(
  @inject('PrismaUsersRepository')
  private usersRepository: IUsersRepository
  ) {}

  async execute({ userIdToDelete, userIdLoggedIn }: IRequest): Promise<void> {
    const userToDeleteExists = await this.usersRepository.findUserById(userIdToDelete);

    if (!userToDeleteExists) {
      throw new AppError("User does not exists!");
    }

    if (userToDeleteExists.id === userIdLoggedIn) {
      throw new AppError("Unauthorized action!", 401);
    }

    await this.usersRepository.delete(userIdToDelete);
  }
}
export { DeleteDashboardUserUseCase };
