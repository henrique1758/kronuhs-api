import { ICreateUserDTO } from "../../dtos/user/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../../dtos/user/IUpdateAvatarUserDTO";
import { IUpdateUserDTO } from "../../dtos/user/IUpdateUserDTO";
import { UserDataDTO } from "../../dtos/user/UserDataDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<UserDataDTO>;
  findAll(): Promise<UserDataDTO[]>;
  findUserByEmail(email: string): Promise<UserDataDTO | null>;
  findUserById(userId: string): Promise<UserDataDTO | null>;
  update(data: IUpdateUserDTO): Promise<void>;
  updateAvatarUser(data: IUpdateUserAvatarDTO): Promise<void>;
  delete(userId: string): Promise<void>;
}

export { IUsersRepository };

