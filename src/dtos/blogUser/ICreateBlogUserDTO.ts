interface ICreateBlogUserDTO {
  name: string;
  email: string;
  password?: string;
  avatar_url?: string;
  githubId?: string;
}

export { ICreateBlogUserDTO };

