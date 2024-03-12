import mongoose from "mongoose";

const connection = {};

export async function dbConnect () {
    if (connection.isConnected) {
        return;
    }
    if (mongoose.connections.length>0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGODB_URI,  {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex: true,
      });
    console.log(`new Connection:`);
    connection.isConnected = db.connections[0].readyState;
};  


export async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === "production") {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log("not disconnected");
        }
    }
}