import slugify from 'slugify';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IPostsRepository } from '../../../../repositories/posts/IPostsRepository';

interface IRequest {
  postId: string;
  userLoggedInId: string;
  title: string;
  subtitle: string;
  content: string;
  bannerUrl?: string;
  categoryId?: string;
}

@injectable()
class UpdatePostUseCase {
  constructor(
  @inject('PrismaPostsRepository')
  private postsRepository: IPostsRepository
  ) {}

  async execute({ postId, userLoggedInId, title, subtitle, content, bannerUrl, categoryId }: IRequest): Promise<void> {
    const postExists = await this.postsRepository.findByPostId(postId);

    if (postExists?.authorId !== userLoggedInId) {
      throw new AppError("Action Unauthorized!");
    }

    if (!postExists) {
      throw new AppError("Post does not exists!");
    }

    if (!title) {
      throw new AppError("title is required!");
    }

    if (!subtitle) {
      throw new AppError("subtitle is required!");
    }

    if (!content) {
      throw new AppError("content is required!");
    }

    if (!bannerUrl) {
      throw new AppError("bannerUrl is required!");
    }

    const slug = slugify(title, {
      lower: true
    });

    await this.postsRepository.update({
      id: postId,
      title,
      subtitle,
      content,
      bannerUrl,
      slug,
      categoryId
    });
  }
}
export { UpdatePostUseCase };

