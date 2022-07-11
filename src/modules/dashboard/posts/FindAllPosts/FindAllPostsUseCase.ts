import { inject, injectable } from "tsyringe";
import { PostCardMap } from "../../../../mappers/PostCardMap";
import { IPostsRepository } from "../../../../repositories/posts/IPostsRepository";

interface IRequest {
  page: number;
  per_page: number;
}

@injectable()
class FindAllPostsUseCase {
  constructor(
    @inject("PrismaPostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute({ page, per_page }: IRequest) {
    const response = await this.postsRepository.findAll();

    const total = response.length;

    const pageStart = (page - 1) * per_page;
    const pageEnd = pageStart + per_page;

    const posts = response.slice(pageStart, pageEnd);

    const postsResponse = posts.map(post => PostCardMap.toDto(post));

    return {
      postsResponse,
      total
    };
  }
}
export { FindAllPostsUseCase };
