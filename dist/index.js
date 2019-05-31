"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const apollo_server_cache_redis_1 = require("apollo-server-cache-redis");
const mongoDbConfig_1 = __importStar(require("./db/mongoDbConfig"));
const schema_1 = require("./graphql/schema");
const plant_1 = __importDefault(require("./datasources/plant"));
require('dotenv').config();
const dataSources = () => ({
    plantAPI: new plant_1.default({ models: mongoDbConfig_1.models })
});
const { PORT } = process.env;
const app = express_1.default();
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: schema_1.resolvers,
    persistedQueries: {
        cache: new apollo_server_cache_redis_1.RedisCache({ host: 'localhost' })
    },
    dataSources,
    context: async ({ req, connection }) => {
        if (connection) {
            return {
                models: mongoDbConfig_1.models
            };
        }
        if (req) {
            return {
                models: mongoDbConfig_1.models
            };
        }
    }
});
mongoDbConfig_1.default();
server.applyMiddleware({ app }); // app is from an existing express app
app.listen({ port: PORT }, () => console.log(`🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`));
//# sourceMappingURL=index.js.map