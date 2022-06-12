interface DashboardUserDataDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export { DashboardUserDataDTO };

