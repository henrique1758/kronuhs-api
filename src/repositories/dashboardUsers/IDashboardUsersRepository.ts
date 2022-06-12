import { DashboardUserDataDTO } from "../../dtos/dashboardUser/DashboardUserDataDTO";
import { ICreateDashboardUserDTO } from "../../dtos/dashboardUser/ICreateDashboardUserDTO";
import { IUpdateUserAvatarDTO } from "../../dtos/dashboardUser/IUpdateAvatarUserDTO";
import { IUpdatePasswordDTO } from "../../dtos/dashboardUser/IUpdatePasswordDTO";
import { IUpdateUserDTO } from "../../dtos/dashboardUser/IUpdateUserDTO";

interface IDashboardUsersRepository {
  create(data: ICreateDashboardUserDTO): Promise<DashboardUserDataDTO>;
  findAll(): Promise<DashboardUserDataDTO[]>;
  findUserByEmail(email: string): Promise<DashboardUserDataDTO | null>;
  findUserById(userId: string): Promise<DashboardUserDataDTO | null>;
  update(data: IUpdateUserDTO): Promise<void>;
  updateAvatarUser(data: IUpdateUserAvatarDTO): Promise<void>;
  updatePassword(data: IUpdatePasswordDTO): Promise<void>;
  delete(userId: string): Promise<void>;
}

export { IDashboardUsersRepository };

