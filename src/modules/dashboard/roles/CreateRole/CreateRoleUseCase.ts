import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IRolesRepository } from "../../../../repositories/roles/IRolesRepository";

@injectable()
class CreateRoleUseCase {
  constructor(
    @inject("PrismaRolesRepository")
    private rolesRepository: IRolesRepository
  ) {}

  async execute(name: string): Promise<void> {
    if (!name) {
      throw new AppError("name is required!");
    }

    const roleExists = await this.rolesRepository.findByName(name);

    if (roleExists) {
      throw new AppError("Role already exists!");
    }

    await this.rolesRepository.create(name);
  }
}

export { CreateRoleUseCase };

