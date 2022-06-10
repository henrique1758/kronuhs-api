import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePostUseCase } from './UpdatePostUseCase';

class UpdatePostController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userLoggedInId } = req.user;
    const { id } = req.params;
    const { title, subtitle, content, categoryId } = req.body;
    const banner_file = req.file?.filename;

    const updatePostUseCase = container.resolve(UpdatePostUseCase);

    await updatePostUseCase.execute({
      postId: id,
      userLoggedInId,
      title,
      subtitle,
      content,
      bannerUrl: banner_file,
      categoryId
    });

    return res.json({ message: "Post updated successfuly!" });
  }
}
export { UpdatePostController };

