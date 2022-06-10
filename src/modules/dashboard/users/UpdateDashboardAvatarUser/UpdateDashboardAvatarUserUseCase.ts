import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../../../repositories/users/IUsersRepository';

interface IRequest {
  userId: string;
  avatar_url: string | undefined;
}

@injectable()
class UpdateDashboardAvatarUserUseCase {
  constructor(
  @inject('PrismaUsersRepository')
  private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatar_url }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findUserById(userId);

    if (!userExists) {
      throw new AppError("User does not exists!");
    }

    if (!avatar_url) {
      throw new AppError("avatar url is required!");
    }

    await this.usersRepository.updateAvatarUser({
      userId,
      avatar_url
    });
  }
}
export { UpdateDashboardAvatarUserUseCase };

