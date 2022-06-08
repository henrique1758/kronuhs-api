import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../../../repositories/users/IUsersRepository';

interface IRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

@injectable()
class UpdateDashboardUserUseCase {
  constructor(
  @inject('PrismaUsersRepository')
  private usersRepository: IUsersRepository
  ) {}

  async execute({ id, firstName, lastName, email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    if (!firstName) {
      throw new AppError("first name is required!");
    }

    if (!lastName) {
      throw new AppError("last name is required!");
    }

    if (!email) {
      throw new AppError("e-mail is required!");
    }

    await this.usersRepository.update({
      id,
      firstName,
      lastName,
      email
    });
  }
}
export { UpdateDashboardUserUseCase };
