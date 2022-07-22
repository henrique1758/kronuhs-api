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

type IResponse = {
  newToken: string;
  newRefreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("PrismaDashboardUserTokensRepository")
    private userTokensRepository: IDashboardUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refreshToken: string): Promise<IResponse> {
    const { email, sub } = verify(refreshToken, authConfig.DASHBOARD_REFRESH_SECRET) as IPayload;

    const userId = sub;

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(
      userId,
      refreshToken
    );

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const newToken = sign({}, authConfig.DASHBOARD_SECRET_KEY, {
      subject: userId,
      expiresIn: authConfig.TOKEN_EXPIRES_IN
    });

    const newRefreshToken = sign({ email }, authConfig.DASHBOARD_REFRESH_SECRET, {
      subject: userId,
      expiresIn: authConfig.REFRESH_TOKEN_EXPIRES_IN
    });    

    await this.userTokensRepository.create({
      userId,
      refresh_token: newRefreshToken, 
      expires_date: this.dateProvider.addDays(authConfig.EXPIRES_DAYS_REFRESH_TOKEN),
    });

    return {
      newToken,
      newRefreshToken
    };
  }
}
export { RefreshTokenUseCase };

