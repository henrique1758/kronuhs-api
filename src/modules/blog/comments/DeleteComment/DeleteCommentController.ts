import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteCommentUseCase } from './DeleteCommentUseCase';

class DeleteCommentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: authorId } = req.user;
    const { id: commentId } = req.params;

    const deleteCommentUseCase = container.resolve(DeleteCommentUseCase);

    await deleteCommentUseCase.execute({
      authorId,
      commentId
    });

    return res.status(204).send();
  }
}
export { DeleteCommentController };
