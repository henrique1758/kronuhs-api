import { prisma } from "../../../config/prisma";
import { ICreateUserDTO } from "../../../dtos/user/ICreateUserDTO";
import { UserDataDTO } from "../../../dtos/user/UserDataDTO";
import { IUsersRepository } from "../IUsersRepository";

class PrismaUsersRepository implements IUsersRepository {
  async create({ firstName, lastName, email, password }: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
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

