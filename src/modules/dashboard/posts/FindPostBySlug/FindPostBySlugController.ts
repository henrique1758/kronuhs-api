import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindPostBySlugUseCase } from "./FindPostBySlugUseCase";

class FindPostBySlugController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { slug } = req.params;

    const findPostBySlugUseCase = container.resolve(FindPostBySlugUseCase);

    const result = await findPostBySlugUseCase.execute(slug);    

    return res.json(result);
  }
}

export { FindPostBySlugController };