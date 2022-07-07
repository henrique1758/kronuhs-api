interface BlogUserDataDTO {
  id: string;
  name: string;
  email: string;
  password: string | null;
  avatarUrl: string | null;
  githubId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export { BlogUserDataDTO };
