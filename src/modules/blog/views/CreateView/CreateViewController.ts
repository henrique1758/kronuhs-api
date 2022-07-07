import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateViewUseCase } from './CreateViewUseCase';

class CreateViewController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    const { id: postId } = req.params;
    const remoteAdress = req.socket.remoteAddress;

    const createViewUseCase = container.resolve(CreateViewUseCase);

    await createViewUseCase.execute({
      ipAdress: remoteAdress,
      postId,
      userId
    });

    return res.send();
  }
}
export { CreateViewController };
