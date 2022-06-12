import { prisma } from "../../../config/prisma";
import { ICreateUserTokenDTO } from "../../../dtos/userToken/ICreateUserTokenDTO";
import { UserTokenDataDTO } from "../../../dtos/userToken/UserTokenDataDTO";
import { IDashboardUserTokensRepository } from "../IDashboardUserTokensRepository";

class PrismaDashboardUserTokensRepository implements IDashboardUserTokensRepository {
  async create({ userId, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<void> {
    await prisma.dashboardUserToken.create({
      data: {
        userId,
        expires_date,
        refresh_token
      }
    });
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokenDataDTO | null> {
    const userToken = await prisma.dashboardUserToken.findFirst({
      where: {
        refresh_token
      }
    });

    return userToken
  }

  async findByUserIdAndRefreshToken(
    userId: string, 
    refresh_token: string
  ): Promise<UserTokenDataDTO | null> {
    const userToken = await prisma.dashboardUserToken.findFirst({
      where: {
        userId,
        refresh_token
      }
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.dashboardUserToken.delete({
      where: {
        id
      }
    });
  }
}

export { PrismaDashboardUserTokensRepository };

