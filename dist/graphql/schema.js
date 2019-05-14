"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = __importDefault(require("./resolvers"));
exports.resolvers = resolvers_1.default;
const typeDefs = apollo_server_1.gql `
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;
exports.typeDefs = typeDefs;
//# sourceMappingURL=schema.js.map