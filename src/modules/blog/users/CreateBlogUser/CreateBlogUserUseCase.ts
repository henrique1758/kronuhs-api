import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IRolesRepository } from "../../../../repositories/roles/IRolesRepository";
import { IUsersRepository } from "../../../../repositories/users/IUsersRepository";

interface IRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@injectable()
class CreateBlogUserUseCase {
  constructor(
    @inject("PrismaUsersRepository")
    private usersRepository: IUsersRepository,
    @inject("PrismaRolesRepository")
    private rolesRepository: IRolesRepository
  ) {}

  async execute({ firstName, lastName, email, password }: IRequest): Promise<void> {
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

    const role = await this.rolesRepository.findByName("visitor");

    await this.usersRepository.create({ 
      firstName,
      lastName,
      email,
      password: passwordHash,
      roleId: role?.id
    });
  }
}

export { CreateBlogUserUseCase };

