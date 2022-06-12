import slugify from 'slugify';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IPostsRepository } from '../../../../repositories/posts/IPostsRepository';

interface IRequest {
  title: string;
  subtitle: string;
  content: string;
  bannerUrl: string;
  authorId: string;
  categoryId: string;
}

@injectable()
class CreatePostUseCase {
  constructor(
  @inject("PrismaPostsRepository")
  private postsRepository: IPostsRepository
  ) {}

  async execute({ 
    title, 
    subtitle, 
    content, 
    bannerUrl,
    authorId, 
    categoryId 
  }: IRequest): Promise<void> {
    if (!title) {
      throw new AppError("title is required!");
    }

    if (!subtitle) {
      throw new AppError("subtitle is required!");
    }

    if (!content) {
      throw new AppError("content is required!");
    }

    if (!authorId) {
      throw new AppError("author id is required!");
    }

    if (!categoryId) {
      throw new AppError("category id is required!");
    }

    const slug = slugify(title, {
      lower: true
    });

    await this.postsRepository.create({
      title,
      subtitle,
      content,
      bannerUrl,
      slug,
      authorId,
      categoryId
    });
  }
}
export { CreatePostUseCase };

