interface PostDataDTO {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  isDraft: boolean;
  bannerUrl: string;
  slug: string;
  comments?: {
    content: string;
    user: {
      name: string;
      avatarUrl: string;
    },
    createdAt: Date;
  }[];
  likes?: {
    userId: string;
    postId: string;
  }[];
  category: {
    name: string;
  };
  author: {
    id?: string;
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
