import { PostParentType, Context } from '../types';
import { userLoader } from '../loaders/user-loader';

export const Post = {
  user: async (parent: PostParentType, __: any, { prisma }: Context) => {
    return await userLoader.load(parent.authorId);
  },
};
