interface CommentDataDTO {
  id: string;
  content: string;
  userId: string | null;
  postId: string | null;
  createdAt: Date;
}

export { CommentDataDTO };
