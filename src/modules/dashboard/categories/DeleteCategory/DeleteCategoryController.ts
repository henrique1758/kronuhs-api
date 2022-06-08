import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

class DeleteCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

    await deleteCategoryUseCase.execute(id);

    return res.json({ message: "Category deleted successfully!" });
  }
}

export { DeleteCategoryController };
