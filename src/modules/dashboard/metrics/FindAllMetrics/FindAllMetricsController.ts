import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllMetricsUseCase } from "./FindAllMetricsUseCase";

class FindAllMetricsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllMetricsUseCase = container.resolve(FindAllMetricsUseCase);

    const result = await findAllMetricsUseCase.execute();

    return res.json(result);
  }
}

export { FindAllMetricsController }