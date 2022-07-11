import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllPostsUseCase } from "./FindAllPostsUseCase";

class FindAllPostsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { page = 1, per_page = 6 } = req.query;

    const findAllPostsUseCase = container.resolve(FindAllPostsUseCase);

    const {
      postsResponse,
      total
    } = await findAllPostsUseCase.execute({
      page: Number(page),
      per_page: Number(per_page)
    });

    res.setHeader('x-total-count', String(total));

    return res.json(postsResponse);
  }
}
export { FindAllPostsController };
