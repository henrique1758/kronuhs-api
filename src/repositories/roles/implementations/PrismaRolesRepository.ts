import { prisma } from "../../../config/prisma";
import { RoleDataDTO } from "../../../dtos/role/RoleDataDTO";
import { IRolesRepository } from "../IRolesRepository";

class PrismaRolesRepository implements IRolesRepository {
  async create(name: string): Promise<void> {
    await prisma.role.create({
      data: {
        name
      }
    });
  }

  async findByName(name: string): Promise<RoleDataDTO | null> {
    const role = await prisma.role.findFirst({
      where: { name }
    });

    return role;
  }
}

export { PrismaRolesRepository };

