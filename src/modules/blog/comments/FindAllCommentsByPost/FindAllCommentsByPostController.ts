import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllCommentsByPostUseCase } from "./FindAllCommentsByPostUseCase";

class FindAllCommentsByPostController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: postId } = req.params;

    const findAllCommentsByPostUseCase = container.resolve(FindAllCommentsByPostUseCase);

    const result = await findAllCommentsByPostUseCase.execute(postId);

    return res.json(result);
  }
}

export { FindAllCommentsByPostController };