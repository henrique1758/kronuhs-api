import { inject, injectable } from "tsyringe";
import { IBlogUsersRepository } from "../../../../repositories/blogUsers/IBlogUsersRepository";
import { ILikesRepository } from "../../../../repositories/likes/ILikesRepository";
import { IPostsRepository } from "../../../../repositories/posts/IPostsRepository";
import { IViewsRepository } from "../../../../repositories/views/IViewsRepository";

@injectable()
class FindAllMetricsUseCase {
  constructor(
    @inject('PrismaBlogUsersRepository')
    private blogUsersRepository: IBlogUsersRepository,
    @inject('PrismaPostsRepository')
    private postsRepository: IPostsRepository,
    @inject('PrismaViewsRepository')
    private viewsRepository: IViewsRepository,
    @inject('PrismaLikesRepository')
    private likesRepository: ILikesRepository
  ) {}

  async execute() {
    const blogUsersCount = await this.blogUsersRepository.count();
    const postsCount = await this.postsRepository.count();
    const viewsCount = await this.viewsRepository.count();
    const likesCount = await this.likesRepository.count();

    return {
      blogUsersCount,
      postsCount,
      viewsCount,
      likesCount
    }
  }
}

export { FindAllMetricsUseCase }