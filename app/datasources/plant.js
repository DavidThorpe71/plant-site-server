import { DataSource } from 'apollo-datasource';

class PlantAPI extends DataSource {
  constructor({ models }) {
    super();
    this.models = models;
  }

  async getPlant({ permalink } = {}) {
    console.log({ permalink });
    const plant = await this.models.Plant.findOne({
      permalink
    }).exec();
    return plant;
  }

  async getPlants({ filter }) {
    const where = filter
      ? {
        $or: [{ location: filter.location }, { light: filter.light }]
      }
      : {};
    const plants = await this.models.Plant.find(where);
    if (plants.length < 1) {
      throw new Error(
        `No plants found for location: ${where.filter.location
          || null}, light: ${where.filter.light || null}`
      );
    }
    return plants;
  }
}

export default PlantAPI;
