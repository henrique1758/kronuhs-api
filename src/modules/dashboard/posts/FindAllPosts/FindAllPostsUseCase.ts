import { inject, injectable } from "tsyringe";
import { PostDataDTO } from "../../../../dtos/post/PostDataDTO";
import { PostCardMap } from "../../../../mappers/PostCardMap";
import { PostMap } from "../../../../mappers/PostMap";
import { IPostsRepository } from "../../../../repositories/posts/IPostsRepository";

@injectable()
class FindAllPostsUseCase {
  constructor(
    @inject("PrismaPostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute() {
    const response = await this.postsRepository.findAll();

    const posts = response.map(post => PostCardMap.toDto(post));

    return posts;
  }
}
export { FindAllPostsUseCase };
