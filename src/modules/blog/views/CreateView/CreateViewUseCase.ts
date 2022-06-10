import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IPostsRepository } from "../../../../repositories/posts/IPostsRepository";
import { IViewsRepository } from "../../../../repositories/views/IViewsRepository";

interface IRequest {
  userId: string;
  postId: string;
}

@injectable()
class CreateViewUseCase {
  constructor(
  @inject("PrismaViewsRepository")
  private viewsRepository: IViewsRepository,
  @inject("PrismaPostsRepository")
  private postsRepository: IPostsRepository
  ) {}

  async execute({ userId, postId }: IRequest): Promise<void> {
    if (!userId) {
      throw new AppError("user id is required!");
    }

    if (!postId) {
      throw new AppError("post id is required!");
    }

    const postExists = await this.postsRepository.findByPostId(postId);

    if (!postExists) {
      throw new AppError("Post does not exists!");
    }

    const views = await this.viewsRepository.findAll(postId);

    const userHasSeen = views.some(view => view.userId === userId);

    if (userHasSeen) {
      return;
    }

    await this.viewsRepository.create({
      userId,
      postId
    });
  }
}
export { CreateViewUseCase };
