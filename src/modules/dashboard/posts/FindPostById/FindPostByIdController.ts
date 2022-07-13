import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindPostByIdUseCase } from "./FindPostByIdUseCase";

class FindPostByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findPostByIdUseCase = container.resolve(FindPostByIdUseCase);

    const result = await findPostByIdUseCase.execute(id);

    return res.json(result);
  }
}

export { FindPostByIdController };