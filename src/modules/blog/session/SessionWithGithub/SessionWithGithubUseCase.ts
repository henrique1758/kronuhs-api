import axios from "axios";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../../repositories/users/IUsersRepository";

interface IResponse {
  access_token: string;
}

@injectable()
class SessionWithGithubUseCase {
  constructor(
    @inject("PrismaUsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      }, 
      headers: {
        "Accept": "application/json"
      }
    });

    const response = await axios.get("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });

    return response.data;
  }
}
export { SessionWithGithubUseCase };

