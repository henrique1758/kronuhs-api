import { ICreateLikeDTO } from "../../dtos/likes/ICreateLikeDTO";
import { LikeDataDTO } from "../../dtos/likes/LikeDataDTO";

interface ILikesRepository {
  create(data: ICreateLikeDTO): Promise<void>;
  findAll(postId: string): Promise<LikeDataDTO[]>;
  findByUserId(userId: string): Promise<LikeDataDTO[] | null>;
  delete(postId: string): Promise<void>;
}

export { ILikesRepository };

