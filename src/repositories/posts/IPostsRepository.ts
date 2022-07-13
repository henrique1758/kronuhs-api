import { ICreatePostDTO } from "../../dtos/post/ICreatePostDTO";
import { IUpdateIsDraftPostDTO } from "../../dtos/post/IUpdateIsDraftPostDTO";
import { IUpdatePostDTO } from "../../dtos/post/IUpdatePostDTO";
import { PostDataDTO } from "../../dtos/post/PostDataDTO";

interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<void>;
  findAll(): Promise<PostDataDTO[]>;
  findAllByCategory(categoryName: string): Promise<PostDataDTO[] | null>;
  findByPostId(postId: string): Promise<PostDataDTO | null>;
  findByPostSlug(slug: string): Promise<PostDataDTO | null>;
  update(data: IUpdatePostDTO): Promise<void>;
  updateIsDraft(data: IUpdateIsDraftPostDTO): Promise<void>;
  delete(postId: string): Promise<void>;
}

export { IPostsRepository };

