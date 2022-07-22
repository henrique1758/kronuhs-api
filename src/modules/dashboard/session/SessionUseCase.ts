import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { authConfig } from "../../../config/auth";
import { AppError } from "../../../errors/AppError";
import { IDateProvider } from "../../../providers/DateProvider/IDateProvider";
import { IDashboardUsersRepository } from "../../../repositories/dashboardUsers/IDashboardUsersRepository";
import { IDashboardUserTokensRepository } from "../../../repositories/dashboardUserTokens/IDashboardUserTokensRepository";

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
    avatarUrl: string;
    roles: {
      name: string;
    }[];
    created_at: Date;
  };
  refresh_token: string;
}

@injectable()
class SessionUseCase {
  constructor(
    @inject("PrismaDashboardUsersRepository")
    private usersRepository: IDashboardUsersRepository,
    @inject("PrismaDashboardUserTokensRepository")
    private userTokensRepository: IDashboardUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
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

    const token = sign({
      roles: user.roles
    }, authConfig.DASHBOARD_SECRET_KEY, {
      subject: user.id,
      expiresIn: authConfig.TOKEN_EXPIRES_IN
    });

    const refresh_token = sign({ email }, authConfig.DASHBOARD_REFRESH_SECRET, {
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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatarUrl: `${process.env.AWS_S3_BASE_URL}/${user.avatarUrl}`,
        created_at: user.createdAt,
        roles: user.roles
      },
      refresh_token
    };

    return authResult;
  }
}

export { SessionUseCase };

