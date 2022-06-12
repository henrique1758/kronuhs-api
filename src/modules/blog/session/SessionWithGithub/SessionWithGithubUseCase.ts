import axios from "axios";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { authConfig } from "../../../../config/auth";
import { IBlogUsersRepository } from "../../../../repositories/blogUsers/IBlogUsersRepository";

interface IAxiosResponse {
  access_token: string;
}

interface User {
  name: string;
  email: string;
  avatar_url: string;
}

interface IResponse {
  token: string;
  userData: User
}

@injectable()
class SessionWithGithubUseCase {
  constructor(
    @inject("PrismaBlogUsersRepository")
    private usersRepository: IBlogUsersRepository
  ) {}

  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAxiosResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      }, 
      headers: {
        "Accept": "application/json"
      }
    });

    const { data: { name, email, avatar_url } } = await axios.get<User>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });

    let user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      user = await this.usersRepository.create({
        name,
        email,
        avatar_url
      });
    }

    const userData = {
      name: user.name,
      email: user.email,
      avatar_url: user.avatarUrl
    }

    const token = sign({}, authConfig.BLOG_SECRET_KEY, {
      subject: user.id,
      expiresIn: authConfig.TOKEN_EXPIRES_IN
    });

    return { token, userData };
  }
}
export { SessionWithGithubUseCase };

