const SQL = require('sequelize');

const createStore = () => {
  const sequelize = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  });

  sequelize
    .authenticate()
    .then((err) => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.log('Unable to connect to the database:', err);
    });

  const User = sequelize.define(
    'user',
    {
      id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: SQL.DATE,
      updatedAt: SQL.DATE,
      email: SQL.STRING,
      password: SQL.STRING,
      token: SQL.STRING
    },
    { timestamps: true }
  );
  User.sync();
  return { User };
};

export default createStore;
