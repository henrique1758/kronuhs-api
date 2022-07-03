import { BlogUserDataDTO } from "../dtos/blogUser/BlogUserDataDTO";

class BlogUserMap {
  static toDTO({
    id,
    name,
    email,
    avatarUrl,
    createdAt,
  }: BlogUserDataDTO) {
    return {
      id,
      name,
      email,
      avatarUrl: `https://kronuhs.s3.sa-east-1.amazonaws.com/avatar/${avatarUrl}`,
      createdAt
    }
  }
}

export { BlogUserMap };