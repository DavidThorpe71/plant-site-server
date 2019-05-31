"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = __importDefault(require("./resolvers"));
exports.resolvers = resolvers_1.default;
const typeDefs = apollo_server_express_1.gql `
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
    getPlant(permalink: String): Plant
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
exports.typeDefs = typeDefs;
//# sourceMappingURL=schema.js.map