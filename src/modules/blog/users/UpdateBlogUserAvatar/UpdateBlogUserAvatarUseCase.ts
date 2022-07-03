import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IStorageProvider } from "../../../../providers/StorageProvider/IStorageProvider";
import { IBlogUsersRepository } from "../../../../repositories/blogUsers/IBlogUsersRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateBlogUserAvatarUseCase {
  constructor(
    @inject("PrismaBlogUsersRepository")
    private usersRepository: IBlogUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findUserByUserId(userId);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    if (!avatarFile) {
      throw new AppError("avatar file is required!");
    }

    if (user.avatarUrl) {
      await this.storageProvider.delete(user.avatarUrl, "avatar")
    }

    await this.storageProvider.save(avatarFile, "avatar");

    await this.usersRepository.updateAvatarUser({
      userId,
      avatar_url: avatarFile
    });
  }
}
export { UpdateBlogUserAvatarUseCase };

