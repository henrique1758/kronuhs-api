import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { ILikesRepository } from '../../../../repositories/likes/ILikesRepository';

interface IRequest {
  authorId: string;
  postId: string;
}

@injectable()
class DeleteLikeUseCase {
  constructor(
  @inject("PrismaLikesRepository")
  private likesRepository: ILikesRepository
  ) {}

  async execute({ authorId, postId }: IRequest): Promise<void> {
    const postLikes = await this.likesRepository.findAll(postId);

    const like = postLikes?.find(like => like.userId === authorId);

    if (!like) {
      throw new AppError("Like not found!", 404);
    }

    await this.likesRepository.delete(like.id);
  }
}
export { DeleteLikeUseCase };

