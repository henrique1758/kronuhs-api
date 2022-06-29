import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IBlogUsersRepository } from "../../../../repositories/blogUsers/IBlogUsersRepository";

interface BlogUserData {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  avatarUrl: string | undefined | null;
}

@injectable()
class ProfileBlogUserUseCase {
  constructor(
    @inject("PrismaBlogUsersRepository")
    private usersRepository: IBlogUsersRepository,
  ) {}

  async execute(userId: string): Promise<BlogUserData> {
    if(!userId) {
      throw new AppError("user id is required!");
    }

    const user = await this.usersRepository.findUserByUserId(userId);

    const userData: BlogUserData = {
      id: user?.id,
      name: user?.id,
      email: user?.email,
      avatarUrl: user?.avatarUrl
    }

    return userData
  }
}

export { ProfileBlogUserUseCase };

