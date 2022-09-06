import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

import typeDefs from './schema';
import { Query, Mutation } from './resolvers';
import { getUserFromToken } from './utils/get-user-from-token';

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
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
