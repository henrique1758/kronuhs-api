import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { authConfig } from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IBlogUsersRepository } from "../../../../repositories/blogUsers/IBlogUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  userData: {
    id: string;
    name: string;
    email: string;
    created_at: Date;
  };
}

@injectable()
class SessionWithEmailAndPasswordUseCase {
  constructor(
    @inject("PrismaBlogUsersRepository")
    private usersRepository: IBlogUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    };

    const passwordMatch = await compare(password, user.password!);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    };

    const token = sign({}, authConfig.BLOG_SECRET_KEY, {
      subject: user.id,
      expiresIn: "1 day"
    });

    const authResult = {
      token,
      userData: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt
      }
    };

    return authResult;
  }
}

export { SessionWithEmailAndPasswordUseCase };

