import { Request, Response } from "express";
import { container } from "tsyringe";
import { SessionUseCase } from "./SessionUseCase";

class SessionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const sessionUseCase = container.resolve(SessionUseCase);

    const result = await sessionUseCase.execute({
      email,
      password
    });

    return res.json(result);
  }
}

export { SessionController };
