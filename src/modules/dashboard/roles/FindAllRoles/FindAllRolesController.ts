import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllRolesUseCase } from "./FindAllRolesUseCase";

class FindAllRolesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllRolesUseCase = container.resolve(FindAllRolesUseCase);

    const response = await findAllRolesUseCase.execute();

    return res.json(response);
  }
}

export { FindAllRolesController }