import { prisma } from "../../../config/prisma";
import { CommentDataDTO } from "../../../dtos/comment/CommentDataDTO";
import { ICreateCommentDTO } from "../../../dtos/comment/ICreateCommentDTO";
import { ICommentsRepository } from "../ICommentsRepository";

class PrismaCommentsRepository implements ICommentsRepository {
  async create({ content, userId, postId }: ICreateCommentDTO): Promise<void> {
    await prisma.comment.create({
      data: {
        content,
        userId,
        postId
      }
    });
  }

  async findByUserId(userId: string): Promise<CommentDataDTO[] | null> {
    const comments = await prisma.comment.findMany({
      where: {
        userId
      },
    });

    return comments;
  }

  async delete(commentId: string): Promise<void> {
    await prisma.comment.delete({
      where: {
        id: commentId
      }
    });
  }
}

export { PrismaCommentsRepository };

