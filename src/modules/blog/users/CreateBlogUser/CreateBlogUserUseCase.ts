import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IBlogUsersRepository } from "../../../../repositories/blogUsers/IBlogUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateBlogUserUseCase {
  constructor(
    @inject("PrismaBlogUsersRepository")
    private usersRepository: IBlogUsersRepository,
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

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({ 
      name,
      email,
      password: passwordHash,
    });
  }
}

export { CreateBlogUserUseCase };

