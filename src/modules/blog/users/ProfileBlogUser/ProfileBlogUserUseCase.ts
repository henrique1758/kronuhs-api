import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { BlogUserMap } from "../../../../mappers/BlogUserMap";
import { IBlogUsersRepository } from "../../../../repositories/blogUsers/IBlogUsersRepository";

interface BlogUserData {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
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

    return BlogUserMap.toDTO(user);
  }
}

export { ProfileBlogUserUseCase };

