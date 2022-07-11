import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateViewUseCase } from './CreateViewUseCase';

class CreateViewController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { userId, ipAdress } = req.body;
    const { id: postId } = req.params;

    const createViewUseCase = container.resolve(CreateViewUseCase);

    await createViewUseCase.execute({
      ipAdress,
      postId,
      userId
    });

    return res.send();
  }
}
export { CreateViewController };
