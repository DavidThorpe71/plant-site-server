"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries = {
    Query: {
        getPlant: async (parent, args, { dataSources }) => dataSources.plantAPI.getPlant({ permalink: args.permalink }),
        getPlants: async (parent, { filter }, { dataSources }) => dataSources.plantAPI.getPlants({ filter })
    }
};
exports.default = queries;
//# sourceMappingURL=index.js.map