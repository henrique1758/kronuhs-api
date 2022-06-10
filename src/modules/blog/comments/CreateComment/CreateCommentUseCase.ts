import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { ICommentsRepository } from '../../../../repositories/comments/ICommentsRepository';
import { IPostsRepository } from '../../../../repositories/posts/IPostsRepository';

interface IRequest {
  content: string;
  userId: string;
  postId: string;
}

@injectable()
class CreateCommentUseCase {
  constructor(
  @inject("PrismaCommentsRepository")
  private commentsRepository: ICommentsRepository,
  @inject("PrismaPostsRepository")
  private postsRepository: IPostsRepository
  ) {}

  async execute({ content, userId, postId }: IRequest): Promise<void> {
    if (!content) {
      throw new AppError("content is required!");
    }

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

    await this.commentsRepository.create({
      content,
      userId,
      postId
    });
  }
}
export { CreateCommentUseCase };

