interface ICreateDashboardUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar_url?: string;
  roleId?: string;
}

export { ICreateDashboardUserDTO };

