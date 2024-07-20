import mongoose from "mongoose";
import { handleError } from "../utils/errorHandler";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(handleError(error));
    process.exit(1);
  }
};

export default connectDB;
