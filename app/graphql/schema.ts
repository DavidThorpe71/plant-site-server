import { gql } from 'apollo-server';
import resolvers from './resolvers';

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

export { typeDefs, resolvers };
