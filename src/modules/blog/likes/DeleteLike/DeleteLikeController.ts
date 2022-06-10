import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteLikeUseCase } from './DeleteLikeUseCase';

class DeleteLikeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: authorId } = req.user;
    const { id: postId } = req.params;

    const deleteLikeUseCase = container.resolve(DeleteLikeUseCase);

    await deleteLikeUseCase.execute({
      authorId,
      postId
    });

    return res.status(204).send();
  }
}
export { DeleteLikeController };
