import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI environment variable.");
}

let isConnected = false; // To track the connection status

export const connectDb = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI as string);

    isConnected = !!connection.connections[0].readyState;
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export const disconnectDb = async () => {
  if (!isConnected) return;

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log("MongoDB disconnected successfully.");
  } catch (error) {
    console.error("Error disconnecting MongoDB:", error);
  }
};
