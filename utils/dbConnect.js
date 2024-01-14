import mongoose from "mongoose"

const dbConnect= async ()=> {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB Connected:`)
}


export default dbConnect;