import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAllPostsByCategoryUseCase } from "./FindAllPostsByCategoryUseCase";

class FindAllPostsByCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { page = 1, per_page = 6 } = req.query;
    const { category } = req.params;

    const findAllPostsByCategoryUseCase = container.resolve(FindAllPostsByCategoryUseCase);

    const { postsResponse, total } = await findAllPostsByCategoryUseCase.execute({
      category,
      page: Number(page),
      per_page: Number(per_page)
    });

    res.setHeader('x-total-count', String(total));

    return res.json(postsResponse);
  }
}

export { FindAllPostsByCategoryController }