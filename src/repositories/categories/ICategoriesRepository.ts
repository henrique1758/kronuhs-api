import { CategoryDataDTO } from "../../dtos/category/CategoryDataDTO";

interface ICategoriesRepository {
  create(name: string): Promise<void>;
  findAll(): Promise<CategoryDataDTO[]>;
  findByName(name: string): Promise<CategoryDataDTO | null>;
  findById(categoryId: string): Promise<CategoryDataDTO | null>;
  delete(categoryId: string): Promise<void>;
}

export { ICategoriesRepository };

