import mysql from 'mysql';

const {
  RDS_HOSTNAME, RDS_USERNAME, RDS_PASSWORD, RDS_PORT, ENV
} = process.env;

let connection;
if (ENV === 'development') {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'my_db'
  });
} else {
  connection = mysql.createConnection({
    host: RDS_HOSTNAME,
    user: RDS_USERNAME,
    password: RDS_PASSWORD,
    port: RDS_PORT
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
