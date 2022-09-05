import { Context, PostCreateArgs, PostPayload, PostUpdateArgs } from '../types';

export const Mutation = {
  postCreate: async (_: any, { post }: PostCreateArgs, context: Context): Promise<PostPayload> => {
    const { title, content } = post;
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
  postUpdate: async (_: any, { postId, post }: PostUpdateArgs, { prisma }: Context): Promise<PostPayload> => {
    const { title, content } = post;
    if (!title && !content)
      return {
        post: null,
        userErrors: [{ message: 'Please provide title or content' }],
      };
    const existingPost = await prisma.post.findUnique({ where: { id: +postId } });
    if (!existingPost)
      return {
        post: null,
        userErrors: [{ message: 'Post does not exist' }],
      };
    try {
      const payloadToUpdate = {
        title,
        content,
      };

      if (!title) delete payloadToUpdate.title;
      if (!content) delete payloadToUpdate.content;

      return {
        post: await prisma.post.update({ data: payloadToUpdate, where: { id: +postId } }),
        userErrors: [],
      };
    } catch (error) {
      return {
        userErrors: [error],
        post: null,
      };
    }
  },
};
