import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import nock from 'nock';
import constructTestServer from './__utils';
// the mocked mongoDB DataSource store
import { mockStore } from '../datasources/__tests__/plant';

// https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/__tests__/integration.js

const GET_PLANT = gql`
  query getPlant($permalink: string) {
    getPlant(permalink: $permalink) {
      name
    }
  }
`;

describe('Queries', () => {
  it('fetches list of plants', async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing dataSources, resolvers, and typeDefs.
    // This function returns the server instance as well as our dataSource
    // instances, so we can overwrite the underlying fetchers
    const { server, plantAPI } = constructTestServer();

    // mock the datasources' underlying fetch methods, whether that's a REST
    // lookup in the RESTDataSource or the store query in the Sequelize datasource
    // plantAPI.getPlant = jest.fn(() => [mockStore]);
    plantAPI.models = mockStore;
    plantAPI.models.findOne.mockReturnValueOnce([{ dataValues: { _id: 1 } }]);

    // use our test server as input to the createTestClient fn
    // This will give us an interface, similar to apolloClient.query
    // to run queries against our instance of ApolloServer
    const { query } = createTestClient(server);
    const res = await query({ query: GET_PLANT });

    expect(res).toMatchSnapshot();
  });
});
