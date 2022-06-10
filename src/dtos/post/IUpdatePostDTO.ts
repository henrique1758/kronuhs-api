interface IUpdatePostDTO {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  bannerUrl?: string;
  slug: string;
  categoryId?: string;
}

export { IUpdatePostDTO };

