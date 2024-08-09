import mongoose from 'mongoose';
import CustomError from './utils/CustomError';

const connectToMongoDB = async () => {
  try {
    if (process.env.MONGO_URL) {
      await mongoose.connect(process.env.MONGO_URL);
      console.log('DB CONNECTED');
    } else {
      throw new CustomError('Not database url found', 404, 'NO DB CONNECTED');
    }
  } catch (error: any) {
    console.log('Error connecting to MongoDB', error.message);
  }
};

export default connectToMongoDB;
