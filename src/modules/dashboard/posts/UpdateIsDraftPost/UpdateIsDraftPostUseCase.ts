import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IPostsRepository } from "../../../../repositories/posts/IPostsRepository";

interface IRequest {
  postId: string;
  postIsDraft: boolean;
  authorId: string;
}

@injectable()
class UpdateIsDraftPostUseCase {
  constructor(
  @inject("PrismaPostsRepository")
  private postsRepository: IPostsRepository
  ) {}

  async execute({ postId, postIsDraft, authorId }: IRequest): Promise<void> {
    if (!postId) {
      throw new AppError("post id is required!");
    }

    const post = await this.postsRepository.findByPostId(postId);

    if (post?.authorId !== authorId) {
      throw new AppError("Action unauthorized!");
    }

    await this.postsRepository.updateIsDraft({
      postId,
      postIsDraft
    });
  }
}

export { UpdateIsDraftPostUseCase };

