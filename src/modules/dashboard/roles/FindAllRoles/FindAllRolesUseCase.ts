import { inject, injectable } from "tsyringe";
import { IRolesRepository } from "../../../../repositories/roles/IRolesRepository";

@injectable()
class FindAllRolesUseCase {
  constructor(
    @inject("PrismaRolesRepository")
    private rolesRepository: IRolesRepository
  ) {}

  async execute() {
    const roles = await this.rolesRepository.findAll();

    return roles;
  }
}

export { FindAllRolesUseCase }