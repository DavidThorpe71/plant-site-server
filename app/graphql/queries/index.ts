import { Light } from '../../db/models/Plant';

type TGetPlantArgs = {
  permalink: string;
};

type TGetPlantsFilter = {
  location: string;
  light: Light;
};
type TGetPlantsArgs = {
  filter: TGetPlantsFilter;
};

const queries = {
  Query: {
    getPlant: async (
      parent: unknown,
      args: TGetPlantArgs,
      { dataSources }: { dataSources: any }
    ) => dataSources.plantAPI.getPlant({ permalink: args.permalink }),
    getPlants: async (
      parent: unknown,
      { filter }: TGetPlantsArgs,
      { dataSources }: { dataSources: any }
    ) => dataSources.plantAPI.getPlants({ filter })
  }
};

export default queries;
