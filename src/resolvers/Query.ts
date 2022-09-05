import { Context, PostsGet } from '../types';

export const Query = {
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
};
