import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../../../repositories/categories/ICategoriesRepository";

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject("PrismaCategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(categoryId: string): Promise<void> {
    const categoryExists = await this.categoriesRepository.findById(categoryId);

    if (!categoryExists) {
      throw new AppError("Category does not exists!");
    }

    await this.categoriesRepository.delete(categoryId);
  }
}

export { DeleteCategoryUseCase };
