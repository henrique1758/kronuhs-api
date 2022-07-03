import { inject, injectable } from "tsyringe";
import { DashboardUserDataDTO } from "../../../../dtos/dashboardUser/DashboardUserDataDTO";
import { AppError } from "../../../../errors/AppError";
import { UserMap } from "../../../../mappers/UserMap";
import { IDashboardUsersRepository } from "../../../../repositories/dashboardUsers/IDashboardUsersRepository";

type UserData = 
  Pick<DashboardUserDataDTO, "id" | "firstName" | "lastName" | "email" | "avatarUrl"| "createdAt">

@injectable()
class ProfileDashboardUserUseCase {
  constructor(
    @inject("PrismaDashboardUsersRepository")
    private usersRepository: IDashboardUsersRepository
    ) {}
    

  async execute(userId: string): Promise<UserData> {
    const userExists = await this.usersRepository.findUserById(userId);

    if (!userExists) {
      throw new AppError("User does not exists!", 404);
    }

    return UserMap.toDTO(userExists);
  }
}
export { ProfileDashboardUserUseCase };

