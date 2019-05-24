import { ApolloServer, Request } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import DataLoader from 'dataloader';
import db, { models } from './db/mongoDbConfig';
import { typeDefs, resolvers } from './graphql/schema';
import PlantAPI from './datasources/plant';

import { batchPlants } from './loaders/plant';

require('dotenv').config();

const dataSources = () => ({
  plantAPI: new PlantAPI({ models })
});

const { PORT } = process.env;
const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  dataSources,
  context: async ({ req, connection }: { req: Request; connection: any }) => {
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
  }
});

const app = express();
db();

app.use(cors());

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: PORT }, () => console.log(
  `🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
));
