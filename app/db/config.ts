import mysql from 'mysql';

require('dotenv').config();

const {
  RDS_HOSTNAME,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_PORT,
  ENV,
  MYSQL_LOCAL_USER,
  MYSQL_LOCAL_PASS,
  MYSQL_LOCAL_HOST
} = process.env;

const config = {
  user: MYSQL_LOCAL_USER,
  password: MYSQL_LOCAL_PASS,
  database: 'plantsite'
};

const connection = mysql.createConnection(config);

export default connection;
