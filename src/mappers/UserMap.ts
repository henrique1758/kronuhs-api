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
      avatarUrl: `https://kronuhs.s3.sa-east-1.amazonaws.com/avatar/${avatarUrl}`,
      createdAt
    }
  }
}

export { UserMap };