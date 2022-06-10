import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ILikesRepository } from "../../../../repositories/likes/ILikesRepository";
import { IPostsRepository } from "../../../../repositories/posts/IPostsRepository";

interface IRequest {
  userId: string;
  postId: string;
}

@injectable()
class CreateLikeUseCase {
  constructor(
  @inject("PrismaLikesRepository")
  private likesRepository: ILikesRepository,
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

    const likes = await this.likesRepository.findAll(postId);

    const userAlreadyLiked = likes.some(like => like.userId === userId);

    if (userAlreadyLiked) {
      return;
    }

    await this.likesRepository.create({
      userId,
      postId
    });
  }
}
export { CreateLikeUseCase };

