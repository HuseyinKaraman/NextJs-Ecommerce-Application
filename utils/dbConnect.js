import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(process.env.MONGODB_URI,  {
        useNewUrlParser: true,
        useUnifiedTopology:true,
      });
    console.log(`MongoDB Connected:`);
};