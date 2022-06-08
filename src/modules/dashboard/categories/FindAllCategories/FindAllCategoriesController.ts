import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllCategoriesUseCase } from "./FindAllCategoriesUseCase";

class FindAllCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllCategoriesUseCase = container.resolve(FindAllCategoriesUseCase);

    const result = await findAllCategoriesUseCase.execute();

    return res.json(result);
  }
}

export { FindAllCategoriesController };
