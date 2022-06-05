import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/AppError";
import { IUsersRepository } from "../../../repositories/users/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  userData: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    created_at: Date;
  };
}

@injectable()
class SessionUseCase {
  constructor(
    @inject("PrismaUsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    };

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    };

    const token = sign({}, String(process.env.DASHBOARD_SECRET_KEY), {
      subject: user.id,
      expiresIn: "1 day"
    });

    const authResult = {
      token,
      userData: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        created_at: user.createdAt
      }
    };

    return authResult;
  }
}

export { SessionUseCase };

