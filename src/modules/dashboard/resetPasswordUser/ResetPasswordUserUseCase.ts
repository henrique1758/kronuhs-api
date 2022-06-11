import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/AppError";
import { IDateProvider } from "../../../providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../../repositories/users/IUsersRepository";
import { IUserTokensRepository } from "../../../repositories/userTokens/IUserTokensRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("PrismaUserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("PrismaUsersRepository")
    private userRepository: IUsersRepository
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

