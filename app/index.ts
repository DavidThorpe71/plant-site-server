import { ApolloServer, Request } from 'apollo-server-express';
import express from 'express';
import { RedisCache } from 'apollo-server-cache-redis';
import db, { models } from './db/mongoDbConfig';
import { typeDefs, resolvers } from './graphql/schema';
import PlantAPI from './datasources/plant';

require('dotenv').config();

export const dataSources = () => ({
  plantAPI: new PlantAPI({ models })
});

export const context = async ({
  req,
  connection
}: {
req: Request;
connection: any;
}) => {
  if (connection) {
    return {
      models
    };
  }
  if (req) {
    return {
      models
    };
  }
};

const { PORT } = process.env;
const app = express();

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: {
    cache: new RedisCache({ host: 'localhost' })
  },
  dataSources,
  context
});

db();

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: PORT }, () => console.log(
  `🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
));
