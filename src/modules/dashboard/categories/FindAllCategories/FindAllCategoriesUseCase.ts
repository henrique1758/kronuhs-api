import { inject, injectable } from "tsyringe";
import { CategoryDataDTO } from "../../../../dtos/category/CategoryDataDTO";
import { ICategoriesRepository } from "../../../../repositories/categories/ICategoriesRepository";

@injectable()
class FindAllCategoriesUseCase {
  constructor(
    @inject("PrismaCategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  
  async execute(): Promise<CategoryDataDTO[]> {
    const allCategories = await this.categoriesRepository.findAll();

    return allCategories;
  }
}

export { FindAllCategoriesUseCase };

