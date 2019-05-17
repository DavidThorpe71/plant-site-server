import queries from './queries';
import mutations from './mutations';

const resolvers = {
  ...queries,
  ...mutations
};

export default resolvers;
