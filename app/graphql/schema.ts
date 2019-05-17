import { gql } from 'apollo-server';
import resolvers from './resolvers';

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
  type Mutation {
    "A first test mutation"
    addPlant(name: String, latinName: String, picture: String): String
  }
`;

export { typeDefs, resolvers };
