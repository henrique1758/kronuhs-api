import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateIsDraftPostUseCase } from './UpdateIsDraftPostUseCase';

class UpdateIsDraftPostController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: authorId } = req.user;
    const { id: postId } = req.params;
    const { postIsDraft } = req.body;

    const updateIsDraftPostUseCase = container.resolve(UpdateIsDraftPostUseCase);

    await updateIsDraftPostUseCase.execute({
      authorId,
      postId,
      postIsDraft
    });

    return res.send();
  }
}
export { UpdateIsDraftPostController };
