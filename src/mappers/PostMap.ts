import { PostDataDTO } from "../dtos/post/PostDataDTO";

class PostMap {
  static toDTO({
    id,
    title,
    subtitle,
    content,
    isDraft,
    bannerUrl,
    slug,
    author,
    category,
    _count,
    createdAt
  }: PostDataDTO) {
    return {
      id,
      title,
      subtitle,
      content,
      isDraft,
      bannerUrl: `https://kronuhs.s3.sa-east-1.amazonaws.com/postBanner/${bannerUrl}`,
      slug,
      author: {
        firstName: author.firstName,
        lastName: author.lastName,
        avatarUrl: `https://kronuhs.s3.sa-east-1.amazonaws.com/avatar/${author.avatarUrl}`,
      },
      category: {
        name: category.name 
      },
      _count: {
        views: _count.views,
        likes: _count.likes
      },
      createdAt,
    }
  }
}

export { PostMap };