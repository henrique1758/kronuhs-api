import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDashboardUsersRepository } from "../../../../repositories/dashboardUsers/IDashboardUsersRepository";

interface IRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

@injectable()
class UpdateDashboardUserUseCase {
  constructor(
  @inject("PrismaUsersRepository")
  private usersRepository: IDashboardUsersRepository
  ) {}

  async execute({ id, firstName, lastName, email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findUserById(id);

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

