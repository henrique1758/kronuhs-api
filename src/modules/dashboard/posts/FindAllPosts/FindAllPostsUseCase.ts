import { inject, injectable } from "tsyringe";
import { PostDataDTO } from "../../../../dtos/post/PostDataDTO";
import { IPostsRepository } from "../../../../repositories/posts/IPostsRepository";

@injectable()
class FindAllPostsUseCase {
  constructor(
  @inject("PrismaPostsRepository")
  private postsRepository: IPostsRepository
  ) {}

  async execute(): Promise<PostDataDTO[]> {
    const posts = await this.postsRepository.findAll();

    return posts;
  }
}
export { FindAllPostsUseCase };
