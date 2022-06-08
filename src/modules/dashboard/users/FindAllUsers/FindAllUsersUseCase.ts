import { inject, injectable } from 'tsyringe';
import { UserDataDTO } from '../../../../dtos/user/UserDataDTO';
import { IUsersRepository } from '../../../../repositories/users/IUsersRepository';

@injectable()
class FindAllUsersUseCase {
  constructor(
  @inject('PrismaUsersRepository')
  private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<UserDataDTO[]> {
    const allUsers = await this.usersRepository.findAll();

    return allUsers;
  }
}
export { FindAllUsersUseCase };

