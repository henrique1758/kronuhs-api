import { RoleDataDTO } from "../../dtos/role/RoleDataDTO";

interface IRolesRepository {
  create(name: string): Promise<void>;
  findByName(name: string): Promise<RoleDataDTO | null>;
  findAll(): Promise<RoleDataDTO[]>;
}

export { IRolesRepository };

