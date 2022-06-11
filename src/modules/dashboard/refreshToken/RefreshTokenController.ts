import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.body;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const result = await refreshTokenUseCase.execute(token);

    return res.json(result);
  }
}
export { RefreshTokenController };
