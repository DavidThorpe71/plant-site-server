import { ApolloServer } from 'apollo-server-express';
import { context as defaultContext } from '../index';
import { typeDefs, resolvers } from '../graphql/schema';
import PlantAPI from '../datasources/plant';
import { models } from '../db/mongoDbConfig';

/**
 * Integration testing utils
 */
const constructTestServer = ({ context = defaultContext } = {}) => {
  const plantAPI = new PlantAPI({ models });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ plantAPI }),
    context
  });

  return { server, plantAPI };
};

export default constructTestServer;
