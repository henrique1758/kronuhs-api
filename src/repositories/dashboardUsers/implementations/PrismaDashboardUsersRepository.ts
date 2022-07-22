import { prisma } from "../../../config/prisma";
import { DashboardUserDataDTO } from "../../../dtos/dashboardUser/DashboardUserDataDTO";
import { ICreateDashboardUserDTO } from "../../../dtos/dashboardUser/ICreateDashboardUserDTO";
import { IUpdateUserAvatarDTO } from "../../../dtos/dashboardUser/IUpdateAvatarUserDTO";
import { IUpdatePasswordDTO } from "../../../dtos/dashboardUser/IUpdatePasswordDTO";
import { IUpdateUserDTO } from "../../../dtos/dashboardUser/IUpdateUserDTO";
import { IDashboardUsersRepository } from "../IDashboardUsersRepository";

class PrismaDashboardUsersRepository implements IDashboardUsersRepository {
  async create({ firstName, lastName, email, password, avatar_url, roleId }: ICreateDashboardUserDTO): Promise<DashboardUserDataDTO> {
    const user = await prisma.dashboardUser.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        avatarUrl: avatar_url,
        roles: {
          connect: {
            id: roleId
          }
        }
      },
      include: {
        roles: {
          select: {
            name: true
          }
        }
      }
    });

    return user;
  }

  async findAll(): Promise<DashboardUserDataDTO[]> {
    const users = await prisma.dashboardUser.findMany({
      include: {
        roles: {
          select: {
            name: true
          }
        }
      }
    });

    return users;
  }

  async findUserByEmail(email: string): Promise<DashboardUserDataDTO | null> {
    const user = await prisma.dashboardUser.findFirst({
      where: { email },
      include: {
        roles: {
          select: {
            name: true
          }
        }
      }
    });

    return user;
  }

  async findUserById(userId: string): Promise<DashboardUserDataDTO | null> {
    const user = await prisma.dashboardUser.findFirst({
      where: { id: userId },
      include: {
        roles: {
          select: {
            name: true
          }
        }
      }
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
    await prisma.dashboardUser.update({
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

export { PrismaDashboardUsersRepository };

