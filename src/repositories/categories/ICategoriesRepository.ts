import { CategoryDataDTO } from "../../dtos/category/CategoryDataDTO";

interface ICategoriesRepository {
  create(name: string): Promise<void>;
  findByName(name: string): Promise<CategoryDataDTO | null>;
}

export { ICategoriesRepository };

