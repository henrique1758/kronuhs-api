import { prisma } from "../../../config/prisma";
import { ICreateViewDTO } from "../../../dtos/views/ICreateViewDTO";
import { IFindPostRequest } from "../../../dtos/views/IFindPostRequest";
import { ViewDataDTO } from "../../../dtos/views/ViewDataDTO";
import { IViewsRepository } from "../IViewsRepository";

class PrismaViewsRepository implements IViewsRepository {
  async create({ userId, postId, ipAdress }: ICreateViewDTO): Promise<void> {
    await prisma.view.create({
      data: {
        ipAdress,
        userId,
        postId,
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

  async findByIpAndPostId({ ip, postId }: IFindPostRequest): Promise<ViewDataDTO | null> {
    const view = await prisma.view.findFirst({
      where: {
        ipAdress: ip,
        postId
      }
    });

    return view;
  }
}

export { PrismaViewsRepository };
