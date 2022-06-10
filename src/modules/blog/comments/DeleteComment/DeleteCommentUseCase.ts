import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { ICommentsRepository } from '../../../../repositories/comments/ICommentsRepository';

interface IRequest {
  authorId: string;
  commentId: string;
}

@injectable()
class DeleteCommentUseCase {
  constructor(
  @inject("PrismaCommentsRepository")
  private commentsRepository: ICommentsRepository
  ) {}

  async execute({ authorId, commentId }: IRequest): Promise<void> {
    const userCommments = await this.commentsRepository.findByUserId(authorId);

    const comment = userCommments?.find(comment => comment.id === commentId);

    if (!comment) {
      throw new AppError("Comment not found!", 404);
    }

    if (comment.userId !== authorId) {
      throw new AppError("Action unauthorized!");
    }

    await this.commentsRepository.delete(commentId);
  }
}
export { DeleteCommentUseCase };
