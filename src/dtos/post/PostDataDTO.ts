interface PostDataDTO {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  isDraft: boolean;
  bannerUrl: string;
  slug: string;
  category: {
    name: string;
  };
  author: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
  },
  _count: {
    views: number;
    likes: number;
  },
  createdAt: Date;
}

export { PostDataDTO };
