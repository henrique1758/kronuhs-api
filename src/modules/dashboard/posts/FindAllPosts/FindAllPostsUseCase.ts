import { inject, injectable } from "tsyringe";
import { PostDataDTO } from "../../../../dtos/post/PostDataDTO";
import { PostMap } from "../../../../mappers/PostMap";
import { IPostsRepository } from "../../../../repositories/posts/IPostsRepository";

@injectable()
class FindAllPostsUseCase {
  constructor(
  @inject("PrismaPostsRepository")
  private postsRepository: IPostsRepository
  ) {}

  async execute(): Promise<PostDataDTO[]> {
    const response = await this.postsRepository.findAll();

    const posts = response.map(post => PostMap.toDTO(post));

    return posts;
  }
}
export { FindAllPostsUseCase };
