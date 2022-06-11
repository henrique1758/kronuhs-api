interface UserTokenDataDTO {
  id: string;
  refresh_token: string;
  expires_date: Date;
  userId: string | null;
  created_at: Date;
}

export { UserTokenDataDTO };
