"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const schema_1 = require("./graphql/schema");
const config_1 = __importDefault(require("./db/config"));
require('dotenv').config();
const { PORT } = process.env;
const server = new apollo_server_express_1.ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs: schema_1.typeDefs,
    resolvers: schema_1.resolvers
});
const app = express_1.default();
config_1.default();
server.applyMiddleware({ app }); // app is from an existing express app
app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
//# sourceMappingURL=index.js.map