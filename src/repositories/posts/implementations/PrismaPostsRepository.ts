import { prisma } from "../../../config/prisma";
import { ICreatePostDTO } from "../../../dtos/post/ICreatePostDTO";
import { IUpdateIsDraftPostDTO } from "../../../dtos/post/IUpdateIsDraftPostDTO";
import { IUpdatePostDTO } from "../../../dtos/post/IUpdatePostDTO";
import { PostDataDTO } from "../../../dtos/post/PostDataDTO";
import { IPostsRepository } from "../IPostsRepository";

class PrismaPostsRepository implements IPostsRepository {
  async create({ title, subtitle, content, bannerUrl, slug, authorId, categoryId }: ICreatePostDTO): Promise<void> {
    await prisma.post.create({
      data: {
        title,
        subtitle,
        content,
        slug,
        bannerUrl,
        author: {
          connect: {
            id: authorId
          }
        },
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    });
  }

  async findAll(): Promise<PostDataDTO[]> {
    const posts = await prisma.post.findMany({
      include: {
        comments: {
          select: {
            user: {
              select: {
                name: true,
                avatarUrl: true
              }
            },
            content: true,
            createdAt: true
          }
        },
        author: {
          select: {
            firstName: true,
            lastName: true,
            avatarUrl: true,
          }
        },
        category: {
          select: {
            name: true
          }
        },
        _count: {
          select: {
            views: true,
            likes: true,
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return posts;
  }

  async findByPostId(postId: string): Promise<PostDataDTO | null> {
    const post = await prisma.post.findFirst({
      where: { id: postId },
      include: {
        comments: {
          select: {
            user: {
              select: {
                name: true,
                avatarUrl: true
              }
            },
            content: true,
            createdAt: true
          }
        },
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          }
        },
        category: {
          select: {
            name: true
          }
        },
        _count: {
          select: {
            views: true,
            likes: true,
            comments: true
          }
        }
      },
    });

    return post;
  }

  async findByPostSlug(slug: string): Promise<PostDataDTO> {
    const post = await prisma.post.findFirst({
      where: { slug },
      include: {
        comments: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                avatarUrl: true,
                githubId: true
              }
            },
            content: true,
            createdAt: true
          }
        },
        likes: {
          select: {
            userId: true,
            postId: true
          }
        },
        author: {
          select: {
            firstName: true,
            lastName: true,
            avatarUrl: true,
          }
        },
        category: {
          select: {
            name: true
          }
        },
        _count: {
          select: {
            views: true,
            likes: true,
            comments: true
          }
        }
      },
    });

    return post;
  }

  async update({ id, title, subtitle, content, bannerUrl, slug, categoryId }: IUpdatePostDTO): Promise<void> {
    await prisma.post.update({
      where: {
        id
      },
      data: {
        title, 
        subtitle, 
        content, 
        bannerUrl, 
        slug,
        categoryId
      }
    });
  }

  async updateIsDraft({ postId, postIsDraft }: IUpdateIsDraftPostDTO): Promise<void> {
    await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        isDraft: postIsDraft
      }
    });
  }

  async delete(postId: string): Promise<void> {
    await prisma.post.delete({
      where: { id: postId }
    });
  }
}

export { PrismaPostsRepository };

