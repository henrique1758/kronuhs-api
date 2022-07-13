import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { PostCardMap } from "../../../../mappers/PostCardMap";
import { IPostsRepository } from "../../../../repositories/posts/IPostsRepository";

interface IRequest {
  category: string;
  page: number;
  per_page: number;
}

@injectable()
class FindAllPostsByCategoryUseCase {
  constructor(
    @inject("PrismaPostsRepository")
    private postsRepository: IPostsRepository
  ) {}

  async execute({ category, page, per_page }: IRequest) {
    if (!category) {
      throw new AppError("Category is required!");
    }

    const response = await this.postsRepository.findAllByCategory(category);

    const total = response.length;

    const pageStart = (page - 1) * per_page;
    const pageEnd = pageStart + per_page;

    const posts = response.slice(pageStart, pageEnd);

    const postsResponse = posts.map(post => PostCardMap.toDto(post));
    
    return {
      postsResponse,
      total
    }
  }
}

export { FindAllPostsByCategoryUseCase }