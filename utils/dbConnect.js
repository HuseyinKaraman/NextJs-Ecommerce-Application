import mongoose from "mongoose";

export const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(`mongodb+srv://hsykrmn:sCwF"Ejc"P}9wrY@cluster0.tpgxyw7.mongodb.net/next-ecom?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log(`MongoDB Connected:`);
};
