import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllPostsUseCase } from "./FindAllPostsUseCase";

class FindAllPostsController {
  async handle(req: Request, res: Response): Promise<Response> {
     const findAllPostsUseCase = container.resolve(FindAllPostsUseCase);

     const result = await findAllPostsUseCase.execute();

     return res.json(result)
  }
}
export { FindAllPostsController };
