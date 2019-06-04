const { gql } = require('apollo-server');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
    # Comments in GraphQL are defined with the hash (#) symbol.

    # This "Book" type can be used in other type declarations.
    type Book {
        title: String
        author: String
    }
    
    type Response {
      status: String,
      id: Int,
      jsonpc: String,
      result: String,
    }
    
    type Token {
      issue(issuerAddress: String!, creatorAddress: String!, secret: String!): Response,
      create(creatorAddress: String!, userAddress: String!, secret: String!): Response,
      transfer(userAddress: String!, creatorAddress: String!, secret: String!, createTokenHash: String!): Response,
      ownerOf(createTokenHash: String!): Response,
      tokensOf(issuerAddress: String!): Response,
      getToken(createTokenHash: String!): Response,
      getTokenCount(issueTokenHash: String!): Response,
    }

    # The "Query" type is the root of all GraphQL queries.
    # (A "Mutation" type will be covered later on.)
    type Query {
        books: [Book],
        token: Token,
        protectedField: String,
        Token: String,
    }
    
    type Mutation {
      issueToken(issueAddress: String, creatorAddress: String, secret: String):String,
      
    }
`;

module.exports = {
  typeDefs,
};