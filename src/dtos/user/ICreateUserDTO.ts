interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string | undefined;
}

export { ICreateUserDTO };

