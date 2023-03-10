import mongoose from 'mongoose';
import config from "../../config/config";

const connectDB = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db.journal.url);
}

export { connectDB };