import { Request, Response } from "express";
import { container } from "tsyringe";
import { SessionWithEmailAndPasswordUseCase } from "./SessionWithEmailAndPasswordUseCase";

class SessionWithEmailAndPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const sessionWithEmailAndPasswordUseCase = container.resolve(SessionWithEmailAndPasswordUseCase);

    const result = await sessionWithEmailAndPasswordUseCase.execute({
      email,
      password
    });

    return res.json(result);
  }
}

export { SessionWithEmailAndPasswordController };
