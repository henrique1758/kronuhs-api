import { DashboardUserDataDTO } from "../dtos/dashboardUser/DashboardUserDataDTO";

class UserMap {
  static toDTO({
    id,
    firstName,
    lastName,
    email,
    avatarUrl,
    createdAt,
  }: DashboardUserDataDTO) {
    return {
      id,
      firstName,
      lastName,
      email,
      avatarUrl: `${process.env.AWS_S3_BASE_URL}/avatar/${avatarUrl}`,
      createdAt
    }
  }
}

export { UserMap };