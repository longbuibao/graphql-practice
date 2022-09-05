import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';
import { Query } from './resolvers';

const resolvers = {
  Query,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is ready on ${url}`);
});
