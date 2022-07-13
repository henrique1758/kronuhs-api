import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { PostMap } from "../../../../mappers/PostMap";
import { IPostsRepository } from "../../../../repositories/posts/IPostsRepository";

@injectable()
class FindPostByIdUseCase {
  constructor(
    @inject("PrismaPostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute(id: string) {
    const post = await this.postsRepository.findByPostId(id);

    if (!post) {
      throw new AppError("Post does not exists!", 404);
    }

    return PostMap.toDTO(post);
  }
}

export { FindPostByIdUseCase };