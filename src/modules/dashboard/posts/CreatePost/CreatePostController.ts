import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePostUseCase } from './CreatePostUseCase';

class CreatePostController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { title, subtitle, content, categoryId  } = req.body;
    const banner_file = req.file!.filename;

    const createPostUseCase = container.resolve(CreatePostUseCase);

    await createPostUseCase.execute({
      title,
      subtitle,
      content,
      bannerUrl: banner_file,
      authorId: id,
      categoryId
    });

    return res.json({ message: "Post created successfuly!" });
  }
}
export { CreatePostController };

