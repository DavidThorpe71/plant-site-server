export const batchPlants = async (keys, models) => {
  const plants = await models.Plant.find({
    _id: {
      $in: keys
    }
  });

  return keys.map(key => plants.find(plant => plant.id === key));
};
