import { ApolloServer } from 'apollo-server';
import { RedisCache } from 'apollo-server-cache-redis';
import isEmail from 'isemail';
import db, { models } from './db/mongoDbConfig';
import { typeDefs, resolvers } from './graphql/schema';
import PlantAPI from './datasources/plant';
import UserAPI from './datasources/user';
import createStore from './utils';

require('dotenv').config();

export const store = createStore();

db();
export const context = async ({ req }) => {
  const auth = (req.headers && req.headers.authorization) || '';
  const email = Buffer.from(auth, 'base64').toString('ascii');

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.users.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return { user: { ...user.dataValues } };
};

const { PORT } = process.env;

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: {
    cache: new RedisCache({ host: 'localhost' })
  },
  dataSources: () => ({
    plantAPI: new PlantAPI({ models }),
    userAPI: new UserAPI({ store })
  }),
  context
});

if (process.env.NODE_ENV !== 'test') {
  server
    .listen({ port: PORT })
    .then(({ url }) => console.log(`Server running at ${url}`));
}
