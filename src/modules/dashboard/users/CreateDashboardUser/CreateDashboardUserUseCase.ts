import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDashboardUsersRepository } from "../../../../repositories/dashboardUsers/IDashboardUsersRepository";

interface IRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
}

@injectable()
class CreateDashboardUserUseCase {
  constructor(
    @inject("PrismaDashboardUsersRepository")
    private usersRepository: IDashboardUsersRepository
  ) {}

  async execute({ firstName, lastName, email, password, roleId }: IRequest): Promise<void> {
    if (!firstName) {
      throw new AppError("First Name is required!", 400);
    }

    if (!lastName) {
      throw new AppError("Last Name is required!", 400);
    }

    if (!email) {
      throw new AppError("E-mail is required!", 400);
    }

    if (!password) {
      throw new AppError("Password is required!", 400);
    }

    const userAlreadyExists = await this.usersRepository.findUserByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists!")
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({ 
      firstName, 
      lastName,
      email, 
      password: passwordHash,
      roleId
    });
  }
}

export { CreateDashboardUserUseCase };

