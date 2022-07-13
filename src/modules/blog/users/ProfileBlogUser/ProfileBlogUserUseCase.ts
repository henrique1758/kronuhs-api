import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { BlogUserMap } from "../../../../mappers/BlogUserMap";
import { IBlogUsersRepository } from "../../../../repositories/blogUsers/IBlogUsersRepository";

interface BlogUserData {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  githubId?: string;
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

    if (user.githubId) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        githubId: user.githubId
      };
    } else {
      return BlogUserMap.toDTO(user);
    }
  }
}

export { ProfileBlogUserUseCase };

