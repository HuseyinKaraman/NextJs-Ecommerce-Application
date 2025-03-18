import mongoose from "mongoose";

export const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(`mongodb+srv://`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected:`);
};
