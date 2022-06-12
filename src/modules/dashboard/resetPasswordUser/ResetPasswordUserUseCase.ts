import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/AppError";
import { IDateProvider } from "../../../providers/DateProvider/IDateProvider";
import { IDashboardUsersRepository } from "../../../repositories/dashboardUsers/IDashboardUsersRepository";
import { IDashboardUserTokensRepository } from "../../../repositories/dashboardUserTokens/IDashboardUserTokensRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("PrismaUserTokensRepository")
    private userTokensRepository: IDashboardUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("PrismaUsersRepository")
    private userRepository: IDashboardUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid!");
    }

    const now = this.dateProvider.dateNow();
    const expires_Date = userToken.expires_date;

    if (this.dateProvider.compareIfBefore(expires_Date, now)) {
      throw new AppError("Token expired!");
    }

    const { userId } = userToken;

    const newPasswordHashed = await hash(password, 8);

    await this.userRepository.updatePassword({
      userId,
      newPassword: newPasswordHashed
    });

    await this.userTokensRepository.deleteById(userToken.id);
  }
}
export { ResetPasswordUserUseCase };

