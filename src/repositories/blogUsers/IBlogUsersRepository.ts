import { BlogUserDataDTO } from "../../dtos/blogUser/BlogUserDataDTO";
import { ICreateBlogUserDTO } from "../../dtos/blogUser/ICreateBlogUserDTO";
import { IUpdateBlogUserAvatarDTO } from "../../dtos/blogUser/IUpdateBlogUserAvatarDTO";
import { IUpdatePasswordDTO } from "../../dtos/blogUser/IUpdatePasswordDTO";

interface IBlogUsersRepository {
  create(data: ICreateBlogUserDTO): Promise<BlogUserDataDTO>;
  findAll(): Promise<BlogUserDataDTO[]>;
  findUserByEmail(email: string): Promise<BlogUserDataDTO | null>;
  findUserByUserId(userId: string): Promise<BlogUserDataDTO | null>;
  updateAvatarUser(data: IUpdateBlogUserAvatarDTO): Promise<void>;
  updatePassword(data: IUpdatePasswordDTO): Promise<void>;
  delete(userId: string): Promise<void>;
  count(): Promise<number>;
}

export { IBlogUsersRepository };

