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
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
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

  input PostInput {
    title: String
    content: String
  }
`;

export default typeDefs;
