import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SessionWithGithubUseCase } from './SessionWithGithubUseCase';

class SessionWithGithubController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { code } = req.body;

    const sessionWithGithubUseCase = container.resolve(SessionWithGithubUseCase);

    const result = await sessionWithGithubUseCase.execute(code);

    return res.json(result);
  }
}
export { SessionWithGithubController };

