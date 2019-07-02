const queries = {
  Query: {
    getPlant: async (parent, args, { dataSources }) => dataSources.plantAPI.getPlant({ permalink: args.permalink }),
    getPlants: async (parent, { filter }, { dataSources }) => dataSources.plantAPI.getPlants({ filter }),
    me: async (parent, args, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
    getUsers: async (parent, args, { dataSources }) => dataSources.userAPI.getUsers()
  }
};

export default queries;
