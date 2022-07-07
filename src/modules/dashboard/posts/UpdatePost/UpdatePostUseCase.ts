import slugify from 'slugify';
import { inject, injectable } from 'tsyringe';
import TurnDownService from "turndown";
import { AppError } from '../../../../errors/AppError';
import { IStorageProvider } from '../../../../providers/StorageProvider/IStorageProvider';
import { IPostsRepository } from '../../../../repositories/posts/IPostsRepository';

interface IRequest {
  postId: string;
  userLoggedInId: string;
  title?: string;
  subtitle?: string;
  content?: string;
  bannerUrl?: string;
  categoryId?: string;
}

const turndownService = new TurnDownService({
  headingStyle: 'setext',
  codeBlockStyle: 'indented',
  fence: '```',
  strongDelimiter: '**',
  bulletListMarker: '*',
  linkStyle: 'inlined'
});

@injectable()
class UpdatePostUseCase {
  constructor(
    @inject("PrismaPostsRepository")
    private postsRepository: IPostsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ postId, userLoggedInId, title, subtitle, content, bannerUrl, categoryId }: IRequest): Promise<void> {
    const postExists = await this.postsRepository.findByPostId(postId);

    if (!postExists) {
      throw new AppError("Post does not exists!");
    }

    if (postExists.author.id !== userLoggedInId) {
      throw new AppError("Action not permitted!");
    }

    if (postExists.bannerUrl) {
      await this.storageProvider.delete(postExists.bannerUrl, "postBanner");
    }

    await this.storageProvider.save(bannerUrl, "postBanner");

    const slug = slugify(title, {
      lower: true
    });

    const contentInMarkDown = turndownService.turndown(content);

    await this.postsRepository.update({
      id: postId,
      title,
      subtitle,
      content: contentInMarkDown,
      bannerUrl,
      slug,
      categoryId
    });
  }
}
export { UpdatePostUseCase };

