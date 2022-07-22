import { inject, injectable } from "tsyringe";
import { DashboardUserDataDTO } from "../../../../dtos/dashboardUser/DashboardUserDataDTO";
import { IDashboardUsersRepository } from "../../../../repositories/dashboardUsers/IDashboardUsersRepository";

@injectable()
class FindAllUsersUseCase {
  constructor(
  @inject("PrismaDashboardUsersRepository")
  private usersRepository: IDashboardUsersRepository
  ) {}

  async execute(): Promise<DashboardUserDataDTO[]> {
    const allUsers = await this.usersRepository.findAll();

    return allUsers;
  }
}
export { FindAllUsersUseCase };

