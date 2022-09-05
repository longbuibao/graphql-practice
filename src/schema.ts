import { gql } from 'apollo-server';
const typeDefs = gql`
  type Query {
    posts: PostsGet!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User!
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type Mutation {
    postCreate(title: String!, content: String!): PostPayload!
  }

  type PostPayload {
    userErrors: [UserError!]
    post: Post
  }

  type PostsGet {
    userErrors: [UserError!]
    posts: [Post]
  }

  type UserError {
    message: String!
  }
`;

export default typeDefs;
