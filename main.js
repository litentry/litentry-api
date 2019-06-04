import {tokenResolver} from "./resolvers/token";

const { ApolloServer } = require('apollo-server');
const { combineResolvers } = require( 'graphql-resolvers');
const { typeDefs } = require( './types' );
const queryResolvers = require('./resolvers/query');
const mutationResolvers = require('./resolvers/mutation');
import _ from 'lodash'
// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const isAuthenticated = (root, args, context, info) => {
  if (!context.user) {
    return new Error('Not authenticated')
  }
};

const protectedField = (root, args, context, info) => 'Protected field value';

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const rootResolver = {
  Query: {
    books: () => books,
    token: queryResolvers.token,
    protectedField: combineResolvers(
      isAuthenticated,
      protectedField
    )
  },
  Mutation: {
    ...mutationResolvers
  },
};

const mainResolver = _.merge(rootResolver, {
  Token: tokenResolver
})

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers: mainResolver,
  context: ({ req }) => ({
    auth: req.headers.authorization
  })});


// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});