import { prisma } from "../../../config/prisma";
import { ICreateUserDTO } from "../../../dtos/user/ICreateUserDTO";
import { UserDataDTO } from "../../../dtos/user/UserDataDTO";
import { IUsersRepository } from "../IUsersRepositorie";

class PrismaUsersRepository implements IUsersRepository {
  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });
  }

  async findUserByEmail(email: string): Promise<UserDataDTO | null> {
    const user = await prisma.user.findFirst({
      where: { email }
    });

    return user;
  }
}

export { PrismaUsersRepository };

