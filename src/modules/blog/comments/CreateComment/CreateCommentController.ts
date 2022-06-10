import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCommentUseCase } from './CreateCommentUseCase';

class CreateCommentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const { id: postId } = req.params;
    const { content } = req.body

    const createCommentUseCase = container.resolve(CreateCommentUseCase);

    await createCommentUseCase.execute({
      content,
      userId,
      postId
    });

    return res.json({ message: "Comment created successfuly!" });
  }
}
export { CreateCommentController };
