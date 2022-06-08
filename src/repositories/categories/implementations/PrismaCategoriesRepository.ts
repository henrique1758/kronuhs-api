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

  async findAll(): Promise<CategoryDataDTO[]> {
    const categories = await prisma.category.findMany();

    return categories;
  }

  async findByName(name: string): Promise<CategoryDataDTO | null> {
    const category = await prisma.category.findFirst({
      where: {
        name
      }
    });

    return category;
  }

  async findById(categoryId: string): Promise<CategoryDataDTO | null> {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId
      }
    });

    return category;
  }

  async delete(categoryId: string): Promise<void> {
    await prisma.category.delete({
      where: {
        id: categoryId
      }
    });
  }
}

export { PrismaCategoriesRepository };

