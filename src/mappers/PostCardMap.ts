import { PostDataDTO } from "../dtos/post/PostDataDTO";

class PostCardMap {
  static toDto({
    id,
    title,
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
      content,
      isDraft,
      bannerUrl: `${process.env.AWS_S3_BASE_URL}/postBanner/${bannerUrl}`,
      slug,
      author: {
        firstName: author.firstName,
        avatarUrl: `${process.env.AWS_S3_BASE_URL}/avatar/${author.avatarUrl}`
      },
      category: {
        name: category.name
      },
      _count: {
        views: _count.views,
        likes: _count.likes
      },
      createdAt
    }
  }
}

export { PostCardMap };