import { inject, injectable } from "tsyringe"
import { CommentDataDTO } from "../../../../dtos/comment/CommentDataDTO";
import { AppError } from "../../../../errors/AppError";
import { ICommentsRepository } from "../../../../repositories/comments/ICommentsRepository";

@injectable()
class FindAllCommentsByPostUseCase {
  constructor(
    @inject("PrismaCommentsRepository")
    private commentsRepository: ICommentsRepository
  ) {}

  async execute(postId: string): Promise<CommentDataDTO[] | null> {
    if (!postId) {
      throw new AppError("post id is required!");
    }

    const comments = await this.commentsRepository.findAllByPostId(postId);

    return comments;
  }
}
export { FindAllCommentsByPostUseCase };