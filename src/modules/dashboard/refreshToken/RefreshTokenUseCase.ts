import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { authConfig } from "../../../config/auth";
import { AppError } from "../../../errors/AppError";
import { IDateProvider } from "../../../providers/DateProvider/IDateProvider";
import { IDashboardUserTokensRepository } from "../../../repositories/dashboardUserTokens/IDashboardUserTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("PrismaDashboardUserTokensRepository")
    private userTokensRepository: IDashboardUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, authConfig.DASHBOARD_REFRESH_SECRET) as IPayload;

    const userId = sub;

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(
      userId,
      token
    );

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, authConfig.DASHBOARD_REFRESH_SECRET, {
      subject: userId,
      expiresIn: authConfig.REFRESH_TOKEN_EXPIRES_IN
    });

    await this.userTokensRepository.create({
      userId,
      refresh_token, 
      expires_date: this.dateProvider.addDays(authConfig.EXPIRES_DAYS_REFRESH_TOKEN),
    });

    return refresh_token;
  }
}
export { RefreshTokenUseCase };

