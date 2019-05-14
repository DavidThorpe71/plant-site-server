import mongoose from 'mongoose';

const db = () => {
  mongoose.connect('mongodb://localhost:27017/plant-site', {
    useNewUrlParser: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`🗄 connected to mongoDb database`);
  });
};
export default db;
