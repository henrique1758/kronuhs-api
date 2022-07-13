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
    comments,
    likes,
    category,
    _count,
    createdAt,
  }: PostDataDTO) {
    return {
      id,
      title,
      subtitle,
      content,
      isDraft,
      bannerUrl: `${process.env.AWS_S3_BASE_URL}/postBanner/${bannerUrl}`,
      slug,
      author: {
        firstName: author.firstName,
        lastName: author.lastName,
        avatarUrl: `${process.env.AWS_S3_BASE_URL}/avatar/${author.avatarUrl}`,
      },
      comments: comments.map(comment => {
        return {
          content: comment.content,
          author: {
            name: comment.user.name,
            avatarUrl: comment.user.githubId ? comment.user.avatarUrl : `${process.env.AWS_S3_BASE_URL}/avatar/${comment.user.avatarUrl}`,
          },
          createdAt: comment.createdAt
        }
      }),
      likes: likes.map(like => {
        return {
          userId: like.userId,
          postId: like.postId
        }
      }),
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