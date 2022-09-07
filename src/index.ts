import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

import typeDefs from './schema';
import { Query, Mutation, Profile, Post, User } from './resolvers';
import { getUserFromToken } from './utils/get-user-from-token';

export const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  Profile,
  Post,
  User,
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const userInfo = getUserFromToken(req.headers.authorization);
    return {
      prisma,
      userInfo,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is ready on ${url}`);
});
