import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { refresh_token } = req.body;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const result = await refreshTokenUseCase.execute(refresh_token);

    return res.json(result);
  }
}
export { RefreshTokenController };

