import Plant, { Light } from '../../db/models/Plant';

type TGetPlantArgs = {
  _id: string;
  name: string;
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
    getPlant: async (parent: unknown, args: TGetPlantArgs, ctx: unknown) => {
      const { _id, name } = args;
      const plant = await Plant.findOne({ $or: [{ _id }, { name }] }).exec();
      if (!plant) {
        throw new Error(
          `No plant found for id: ${_id || null} and name: ${name || null}`
        );
      }
      return plant;
    },
    getPlants: async (parent: unknown, args: TGetPlantsArgs, ctx: unknown) => {
      const { filter } = args;
      const where = filter
        ? {
          $or: [{ location: filter.location }, { light: filter.light }]
        }
        : {};

      const plants = await Plant.find(where);
      if (plants.length < 1) {
        throw new Error(
          `No plants found for location: ${filter.location
            || null}, light: ${filter.light || null}`
        );
      }
      return plants;
    }
  }
};

export default queries;
