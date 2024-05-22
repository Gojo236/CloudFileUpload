import mongoose from "mongoose";

const connection: {isConnected?: number} = {};
async function connectDB() {
  if(connection.isConnected)
    {
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_DB_URI!);
    connection.isConnected = db.connections[0].readyState;
}

export default connectDB;