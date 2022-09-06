import { PrismaClient, Prisma, User, Post } from '@prisma/client';

export type Context = {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
};

export type PostCreateArgs = {
  post: { title: string; content: string };
};

export type PostUpdateArgs = {
  postId: string;
  post: { title?: string; content?: string };
};

type UserErrors =
  | {
      message: string;
    }[]
  | {};

export type PostPayload = {
  userErrors: UserErrors;
  post: null | Post;
};

export type PostsGet = {
  userErrors: UserErrors;
  posts: null | Post[];
};

export type UserPayload = {
  userErrors: UserErrors;
  token: string | null;
};

export type SignupArgs = {
  email: string;
  name: string;
  bio: string;
  password: string;
};
