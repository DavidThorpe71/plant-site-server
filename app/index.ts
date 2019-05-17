import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs, resolvers } from './graphql/schema';
// import db from './db/mongoDbConfig';

require('dotenv').config();

const { PORT } = process.env;
const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers
});

const app = express();

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: PORT }, () => console.log(
  `🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
));
