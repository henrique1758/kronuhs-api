interface LikeDataDTO {
  id: string;
  userId: string | null;
  postId: string | null;
  createdAt: Date;
}

export { LikeDataDTO };
