"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
require('dotenv').config();
const { RDS_HOSTNAME, RDS_USERNAME, RDS_PASSWORD, RDS_PORT, ENV, MYSQL_LOCAL_USER, MYSQL_LOCAL_PASS, MYSQL_LOCAL_HOST } = process.env;
const config = {
    user: MYSQL_LOCAL_USER,
    password: MYSQL_LOCAL_PASS,
    database: 'plantsite'
};
const connection = mysql_1.default.createConnection(config);
exports.default = connection;
//# sourceMappingURL=config.js.map