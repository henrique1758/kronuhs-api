import { prisma } from "../../../config/prisma";
import { ICreateUserDTO } from "../../../dtos/user/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../../../dtos/user/IUpdateAvatarUserDTO";
import { IUpdatePasswordDTO } from "../../../dtos/user/IUpdatePasswordDTO";
import { IUpdateUserDTO } from "../../../dtos/user/IUpdateUserDTO";
import { UserDataDTO } from "../../../dtos/user/UserDataDTO";
import { IUsersRepository } from "../IUsersRepository";

class PrismaUsersRepository implements IUsersRepository {
  async create({ firstName, lastName, email, password, roleId }: ICreateUserDTO): Promise<UserDataDTO> {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        roles: {
          connect: {
            id: roleId
          }
        }
      }
    });

    return user;
  }

  async findAll(): Promise<UserDataDTO[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async findUserByEmail(email: string): Promise<UserDataDTO | null> {
    const user = await prisma.user.findFirst({
      where: { email }
    });

    return user;
  }

  async findUserById(userId: string): Promise<UserDataDTO | null> {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        roles: true
      }
    });

    return user;
  }

  async update({ id, firstName, lastName, email }: IUpdateUserDTO): Promise<void> {
    await prisma.user.update({
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
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        avatarUrl: avatar_url
      }
    });
  }

  async updatePassword({ userId, newPassword }: IUpdatePasswordDTO): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: newPassword
      }
    });
  }

  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId
      }
    });
  }
}

export { PrismaUsersRepository };

