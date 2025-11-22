import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(ENV.mongo_uri);
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
