import mysql from 'mysql';

require('dotenv').config();

const { MYSQL_LOCAL_USER, MYSQL_LOCAL_PASS } = process.env;

const config = {
  user: MYSQL_LOCAL_USER,
  password: MYSQL_LOCAL_PASS,
  database: 'plantsite'
};

const connection = mysql.createConnection(config);

export default connection;
