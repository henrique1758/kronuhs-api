import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/AppError";
import { IUsersRepository } from "../../../repositories/users/IUsersRepositorie";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("PrismaUsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: IRequest): Promise<void> {
    if (!name) {
      throw new AppError("Name is required!", 400);
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

    await this.usersRepository.create({ 
      name, 
      email, 
      password
    });
  }
}

export { CreateUserUseCase };
