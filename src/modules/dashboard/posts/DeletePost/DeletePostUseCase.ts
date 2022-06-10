import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IPostsRepository } from '../../../../repositories/posts/IPostsRepository';

@injectable()
class DeletePostUseCase {
  constructor(
  @inject('PrismaPostsRepository')
  private postsRepository: IPostsRepository
  ) {}

  async execute(postId: string): Promise<void> {
    const postExists = await this.postsRepository.findByPostId(postId);

    if (!postExists) {
      throw new AppError("Post does not exists!");
    }

    await this.postsRepository.delete(postId);
  }
}
export { DeletePostUseCase };

