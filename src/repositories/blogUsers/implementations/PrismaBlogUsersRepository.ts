import { prisma } from "../../../config/prisma";
import { BlogUserDataDTO } from "../../../dtos/blogUser/BlogUserDataDTO";
import { ICreateBlogUserDTO } from "../../../dtos/blogUser/ICreateBlogUserDTO";
import { IUpdatePasswordDTO } from "../../../dtos/blogUser/IUpdatePasswordDTO";
import { IUpdateUserAvatarDTO } from "../../../dtos/dashboardUser/IUpdateAvatarUserDTO";
import { IUpdateUserDTO } from "../../../dtos/dashboardUser/IUpdateUserDTO";
import { IBlogUsersRepository } from "../IBlogUsersRepository";

class PrismaBlogUsersRepository implements IBlogUsersRepository {
  async create({ name, email, password, avatar_url }: ICreateBlogUserDTO): Promise<BlogUserDataDTO> {
    const user = await prisma.blogUser.create({
      data: {
        name,
        email,
        password,
        avatarUrl: avatar_url,
      }
    });

    return user;
  }

  async findAll(): Promise<BlogUserDataDTO[]> {
    const users = await prisma.blogUser.findMany();

    return users;
  }

  async findUserByUserId(userId: string): Promise<BlogUserDataDTO | null> {
    const user = await prisma.blogUser.findFirst({
      where: { id: userId }
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<BlogUserDataDTO | null> {
    const user = await prisma.blogUser.findFirst({
      where: { email }
    });

    return user;
  }

  async findUserById(userId: string): Promise<BlogUserDataDTO | null> {
    const user = await prisma.blogUser.findFirst({
      where: { id: userId }
    });

    return user;
  }

  async update({ id, firstName, lastName, email }: IUpdateUserDTO): Promise<void> {
    await prisma.dashboardUser.update({
      where: {
        id
      },
      data: {
        firstName,
        lastName,
        email
      }
    });
  }

  async updateAvatarUser({ userId, avatar_url }: IUpdateUserAvatarDTO): Promise<void> {
    await prisma.dashboardUser.update({
      where: {
        id: userId
      },
      data: {
        avatarUrl: avatar_url
      }
    });
  }

  async updatePassword({ userId, newPassword }: IUpdatePasswordDTO): Promise<void> {
    await prisma.blogUser.update({
      where: {
        id: userId
      },
      data: {
        password: newPassword
      }
    });
  }

  async delete(userId: string): Promise<void> {
    await prisma.dashboardUser.delete({
      where: {
        id: userId
      }
    });
  }
}

export { PrismaBlogUsersRepository };

