import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../../../repositories/categories/ICategoriesRepository";

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("PrismaCategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(name: string): Promise<void> {
    if (!name) {
      throw new AppError("name is required!")
    }

    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    await this.categoriesRepository.create(name);
  }
}

export { CreateCategoryUseCase };
