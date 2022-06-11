import { ICreateUserTokenDTO } from "../../dtos/userToken/ICreateUserTokenDTO";
import { UserTokenDataDTO } from "../../dtos/userToken/UserTokenDataDTO";

interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokenDataDTO | null>;
  findByUserIdAndRefreshToken(
    userId: string, 
    refresh_token: string
  ): Promise<UserTokenDataDTO | null>;
  deleteById(id: string): Promise<void>;
}

export { IUserTokensRepository };

