import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeletePostUseCase } from './DeletePostUseCase';

class DeletePostController {
  async handle(req: Request, res: Response): Promise<Response> {
     const { id: postId } = req.params;

     const deletePostUseCase = container.resolve(DeletePostUseCase);

     await deletePostUseCase.execute(postId);

     return res.status(204).send();
  }
}
export { DeletePostController };
