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
      avatarUrl: `${process.env.AWS_S3_BASE_URL}/avatar/${avatarUrl}`,
      createdAt
    }
  }
}

export { BlogUserMap };