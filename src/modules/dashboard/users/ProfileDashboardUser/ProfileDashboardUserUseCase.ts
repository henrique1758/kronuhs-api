import { inject, injectable } from 'tsyringe';
import { UserDataDTO } from '../../../../dtos/user/UserDataDTO';
import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../../../repositories/users/IUsersRepository';

type UserData = 
  Pick<UserDataDTO, "id" | "firstName" | "lastName" | "email" | "createdAt">

@injectable()
class ProfileDashboardUserUseCase {
  constructor(
    @inject('PrismaUsersRepository')
    private usersRepository: IUsersRepository
    ) {}
    

  async execute(userId: string): Promise<UserData> {
    const userExists = await this.usersRepository.findUserById(userId);

    if (!userExists) {
      throw new AppError("User does not exists!", 404);
    }

    const user = {
      id: userExists.id,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      email: userExists.lastName,
      createdAt: userExists.createdAt
    };

    return user;
  }
}
export { ProfileDashboardUserUseCase };
