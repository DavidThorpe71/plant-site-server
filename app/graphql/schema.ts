import { gql } from 'apollo-server';
import resolvers from './resolvers';

const typeDefs = gql`
  enum Light {
    None
    Shade
    Indirect
    Direct
  }
  type Plant {
    _id: String
    name: String
    permalink: String
    latinName: String
    location: String
    image: String
    wateringInstructions: String
    light: Light
  }

  input GetPlantFilter {
    location: String
    light: Light
  }

  type Query {
    getPlant(plantName: String): Plant
    getPlants(filter: GetPlantFilter): [Plant]
  }

  type Mutation {
    addPlant(
      name: String
      latinName: String
      image: String
      location: String
      wateringInstructions: String
      light: Light
    ): Plant
    editPlant(
      _id: String
      name: String
      latinName: String
      image: String
      location: String
      wateringInstructions: String
      light: Light
    ): Plant
    removePlant(_id: String): Plant
  }
`;

export { typeDefs, resolvers };
