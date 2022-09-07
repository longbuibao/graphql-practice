import { Context, ProfileParent } from '../types';

export const User = {
  posts: async (parent: ProfileParent, __: any, { prisma, userInfo }: Context) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: parent.id,
        published: userInfo.userId === parent.id ? undefined : true,
      },
    });
    return posts;
  },
};
