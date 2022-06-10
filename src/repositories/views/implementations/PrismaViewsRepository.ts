import { prisma } from "../../../config/prisma";
import { ICreateViewDTO } from "../../../dtos/views/ICreateViewDTO";
import { ViewDataDTO } from "../../../dtos/views/ViewDataDTO";
import { IViewsRepository } from "../IViewsRepository";

class PrismaViewsRepository implements IViewsRepository {
  async create({ userId, postId }: ICreateViewDTO): Promise<void> {
    await prisma.view.create({
      data: {
        userId,
        postId
      }
    });
  }

  async findAll(postId: string): Promise<ViewDataDTO[]> {
    const views = await prisma.view.findMany({
      where: {
        postId
      }
    });

    return views;
  }
}

export { PrismaViewsRepository };
