interface PostDataDTO {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  bannerUrl: string;
  slug: string;
  categoryId: string | null;
  authorId: string | null;
  createdAt: Date;
}

export { PostDataDTO };
