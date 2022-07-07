import { CommentDataDTO } from "../../dtos/comment/CommentDataDTO";
import { ICreateCommentDTO } from "../../dtos/comment/ICreateCommentDTO";

interface ICommentsRepository {
  create(data: ICreateCommentDTO): Promise<void>;
  findByUserId(userId: string): Promise<CommentDataDTO[] | null>;
  findAllByPostId(postId: string): Promise<CommentDataDTO[] | null>;
  delete(commentId: string): Promise<void>;
}

export { ICommentsRepository };

