import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateLikeUseCase } from './CreateLikeUseCase';

class CreateLikeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: postId } = req.params;
    const { id: userId } = req.user;
    
    const createLikeUseCase = container.resolve(CreateLikeUseCase);
  
    await createLikeUseCase.execute({
      userId,
      postId
    });
    
    return res.send();
  }
}
export { CreateLikeController };
