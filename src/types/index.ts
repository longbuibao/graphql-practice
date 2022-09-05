import { PrismaClient, Prisma } from '@prisma/client';
import { Post } from '@prisma/client';

export type Context = {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
};

export type PostCreateArgs = {
  title: string;
  content: string;
};

export type PostPayload = {
  userErrors:
    | {
        message: string;
      }[]
    | {};
  post: null | Post;
};
