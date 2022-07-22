import { prisma } from "../../../config/prisma";
import { ICreateLikeDTO } from "../../../dtos/likes/ICreateLikeDTO";
import { LikeDataDTO } from "../../../dtos/likes/LikeDataDTO";
import { ILikesRepository } from "../ILikesRepository";

class PrismaLikesRepository implements ILikesRepository {
  async create({ userId, postId }: ICreateLikeDTO): Promise<void> {
    await prisma.like.create({
      data: {
        userId,
        postId
      }
    });
  }

  async findAll(postId: string): Promise<LikeDataDTO[]> {
    const likes = await prisma.like.findMany({
      where: {
        postId
      }
    });

    return likes;
  }

  async findByUserId(userId: string): Promise<LikeDataDTO[] | null> {
    const likes = await prisma.like.findMany({
      where: {
        userId
      }
    });

    return likes;
  }

  async delete(likeId: string): Promise<void> {
    await prisma.like.delete({
      where: {
        id: likeId
      }
    });
  }

  async count(): Promise<number> {
    const likesCount = await prisma.view.count();

    return likesCount
  }
}

export { PrismaLikesRepository };

