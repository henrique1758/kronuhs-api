import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDashboardUsersRepository } from "../../../../repositories/dashboardUsers/IDashboardUsersRepository";

interface IRequest {
  userId: string;
  avatar_url: string | undefined;
}

@injectable()
class UpdateDashboardAvatarUserUseCase {
  constructor(
  @inject("PrismaUsersRepository")
  private usersRepository: IDashboardUsersRepository
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

