import { prisma } from "../../../config/prisma";
import { CategoryDataDTO } from "../../../dtos/category/CategoryDataDTO";
import { ICategoriesRepository } from "../ICategoriesRepository";

class PrismaCategoriesRepository implements ICategoriesRepository {
  async create(name: string): Promise<void> {
    await prisma.category.create({
      data: {
        name
      }
    })
  }

  async findByName(name: string): Promise<CategoryDataDTO | null> {
    const category = await prisma.category.findFirst({
      where: {
        name
      }
    });

    return category;
  }
}

export { PrismaCategoriesRepository };

