import { Post } from '@prisma/client';
import { Context } from '../types';

export const Query = {
  posts: async (_: any, __: any, { prisma }: Context): Promise<Post[]> => {
    return await prisma.post.findMany();
  },
};
