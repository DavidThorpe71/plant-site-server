import Plant, { Light } from '../../db/models/Plant';

type TAddPlantArgs = {
  name: string;
  latinName: string;
  location: string;
  image: string;
  wateringInstructions: string;
  light: Light;
};

type TEditPlantArgs = {
  _id: string;
  name: string;
  latinName: string;
  location: string;
  image: string;
  wateringInstructions: string;
  light: Light;
};

type TRemovePlantArgs = {
  _id: string;
};

const mutations = {
  Mutation: {
    addPlant: async (parent: unknown, args: TAddPlantArgs, ctx: unknown) => {
      const {
        name,
        latinName,
        location,
        image,
        wateringInstructions,
        light
      } = args;
      const newPlant = await Plant.findOneAndUpdate(
        { name, latinName },
        {
          name,
          latinName,
          location,
          image,
          wateringInstructions,
          light
        },
        { new: true, upsert: true }
      ).exec();
      if (!newPlant) {
        throw new Error(
          `unable to create or update a plant with the name: ${name} and latinName: ${latinName}`
        );
      }
      return newPlant;
    },
    editPlant: async (parent: unknown, args: TEditPlantArgs, ctx: unknown) => {
      const {
        _id,
        name,
        latinName,
        location,
        image,
        wateringInstructions,
        light
      } = args;
      const plantToEdit = await Plant.findById(_id).exec();
      if (!plantToEdit) {
        throw new Error(`Unable to find the plant with ID: ${_id} to edit`);
      }
      const editedPlant = await Plant.findOneAndUpdate(
        { _id },
        {
          name: name || plantToEdit.name,
          latinName: latinName || plantToEdit.latinName,
          location: location || plantToEdit.location,
          image: image || plantToEdit.image,
          wateringInstructions:
            wateringInstructions || plantToEdit.wateringInstructions,
          light: light || plantToEdit.light
        },
        { new: true }
      ).exec();
      if (!editedPlant) {
        throw new Error(`Unable to edit plant with ID: ${_id}`);
      }
      return editedPlant;
    },
    removePlant: async (
      parent: unknown,
      args: TRemovePlantArgs,
      ctx: unknown
    ) => {
      const { _id } = args;
      const plantToRemove = await Plant.findOneAndDelete({ _id }).exec();

      if (!plantToRemove) {
        throw new Error(`Unable to remove plant with id: ${_id}`);
      }
      return plantToRemove;
    }
  }
};

export default mutations;
