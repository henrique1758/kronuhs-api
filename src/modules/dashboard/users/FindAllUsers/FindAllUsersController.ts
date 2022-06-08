import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";

class FindAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {

     const findAllUsersUseCase = container.resolve(FindAllUsersUseCase);

     const result = await findAllUsersUseCase.execute();

     console.log(result);

     return res.json(result);
  }
}
export { FindAllUsersController };

