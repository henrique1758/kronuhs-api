import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IStorageProvider } from "../../../../providers/StorageProvider/IStorageProvider";
import { IDashboardUsersRepository } from "../../../../repositories/dashboardUsers/IDashboardUsersRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateDashboardAvatarUserUseCase {
  constructor(
    @inject("PrismaDashboardUsersRepository")
    private usersRepository: IDashboardUsersRepository
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    if (!avatarFile) {
      throw new AppError("avatar file is required!");
    }

    await this.usersRepository.updateAvatarUser({
      userId,
      avatar_url: avatarFile
    });
  }
}
export { UpdateDashboardAvatarUserUseCase };

