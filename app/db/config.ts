import mysql from 'mysql';

require('dotenv').config();

const {
  RDS_HOSTNAME,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_PORT,
  ENV,
  DEV_USER,
  DEV_PASS
} = process.env;

export default () => {
  console.log({ RDS_HOSTNAME, RDS_USERNAME, RDS_PASSWORD });
  const connection = mysql.createConnection({
    host: RDS_HOSTNAME,
    user: RDS_USERNAME,
    password: RDS_PASSWORD,
    port: Number(RDS_PORT)
  });

  connection.connect((err) => {
    if (err) {
      console.error(`Database connection failed: ${err.stack}`);
      return;
    }

    console.log('Connected to database.');
  });

  connection.end();
};
