import { DataSource } from 'apollo-datasource';
// import { models } from '../db/mongoDbConfig';

class PlantAPI extends DataSource {
  constructor({ models }) {
    super();
    this.models = models;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getPlant({ plantName: plantNameArg } = {}) {
    const plant = await this.models.Plant.findOne({
      name: plantNameArg
    }).exec();
    return plant;
  }

  async getPlants({ where }) {
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
