import { Context, PostCreateArgs, PostPayload } from '../types';

export const Mutation = {
  postCreate: async (_: any, { content, title }: PostCreateArgs, context: Context): Promise<PostPayload> => {
    if (!title || !content) {
      return {
        userErrors: [{ message: 'You must provide a title and a content to create a post' }],
        post: null,
      };
    }

    try {
      const post = await context.prisma.post.create({
        data: { content, title, authorId: 1 },
      });

      return {
        userErrors: [],
        post,
      };
    } catch (error) {
      return {
        userErrors: [error],
        post: null,
      };
    }
  },
};
