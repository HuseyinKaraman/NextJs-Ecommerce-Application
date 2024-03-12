import mongoose from "mongoose";

const dotenv = require("dotenv");

export const dbConnect = async () => {
    dotenv.config();
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log(`MongoDB Connected:`);
};
