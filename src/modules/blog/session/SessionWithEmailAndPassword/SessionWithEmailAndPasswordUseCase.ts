import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { authConfig } from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../providers/DateProvider/IDateProvider";
import { IBlogUsersRepository } from "../../../../repositories/blogUsers/IBlogUsersRepository";
import { IBlogUserTokensRepository } from "../../../../repositories/blogUserTokens/IBlogUserTokensRepository";

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
  refresh_token: string;
}

@injectable()
class SessionWithEmailAndPasswordUseCase {
  constructor(
    @inject("PrismaBlogUsersRepository")
    private usersRepository: IBlogUsersRepository,
    @inject("PrismaBlogUserTokensRepository")
    private userTokensRepository: IBlogUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
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

    const refresh_token = sign({ email }, authConfig.BLOG_REFRESH_SECRET, {
      subject: user.id,
      expiresIn: authConfig.REFRESH_TOKEN_EXPIRES_IN
    });

    await this.userTokensRepository.create({
      userId: user.id,
      refresh_token, 
      expires_date: this.dateProvider.addDays(authConfig.EXPIRES_DAYS_REFRESH_TOKEN),
    });

    const authResult: IResponse = {
      token,
      userData: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt
      },
      refresh_token
    };

    return authResult;
  }
}

export { SessionWithEmailAndPasswordUseCase };

