import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

import typeDefs from './schema';
import { Query, Mutation } from './resolvers';

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is ready on ${url}`);
});
