import { ICreateUserDTO } from "../../dtos/user/ICreateUserDTO";
import { UserDataDTO } from "../../dtos/user/UserDataDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findUserByEmail(email: string): Promise<UserDataDTO | null>;
}

export { IUsersRepository };

