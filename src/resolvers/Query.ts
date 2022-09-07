import { Context, PostsGet } from '../types';

export const Query = {
  me: async (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) return null;
    return prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  posts: async (_: any, __: any, { prisma }: Context): Promise<PostsGet> => {
    try {
      const posts = await prisma.post.findMany();
      return {
        userErrors: [],
        posts,
      };
    } catch (error) {
      return {
        userErrors: [error],
        posts: null,
      };
    }
  },
  profile: async (_: any, { userId }: { userId: string }, { prisma }: Context) => {
    const user = await prisma.profile.findUnique({
      where: {
        userId: +userId,
      },
    });

    return user;
  },
};
