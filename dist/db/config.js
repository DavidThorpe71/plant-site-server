"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const { RDS_HOSTNAME, RDS_USERNAME, RDS_PASSWORD, RDS_PORT, ENV } = process.env;
exports.default = () => {
    let connection;
    if (ENV === 'development') {
        connection = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'me',
            password: 'secret',
            database: 'my_db'
        });
    }
    else {
        connection = mysql_1.default.createConnection({
            host: RDS_HOSTNAME,
            user: RDS_USERNAME,
            password: RDS_PASSWORD,
            port: Number(RDS_PORT)
        });
    }
    connection.connect((err) => {
        if (err) {
            console.error(`Database connection failed: ${err.stack}`);
            return;
        }
        console.log('Connected to database.');
    });
    connection.end();
};
//# sourceMappingURL=config.js.map