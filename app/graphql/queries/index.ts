import { models } from '../../db/mongoDbConfig';
import { Light } from '../../db/models/Plant';

type TGetPlantArgs = {
  plantName: string;
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
    ) => dataSources.plantAPI.getPlant({ plantName: args.plantName }),
    getPlants: async (
      parent: unknown,
      args: TGetPlantsArgs,
      { dataSources }: { dataSources: any }
    ) => {
      const { filter } = args;
      const where = filter
        ? {
          $or: [{ location: filter.location }, { light: filter.light }]
        }
        : {};
      return dataSources.plantAPI.getPlants({ where });
    }
  }
};

export default queries;
