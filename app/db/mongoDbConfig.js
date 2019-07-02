import mongoose from 'mongoose';
import Plant from './models/Plant';

const db = () => {
  mongoose.connect('mongodb://localhost:27017/plant-site', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`🗄 connected to mongoDb database`);
  });
};

const models = { Plant };
export { models };

export default db;
