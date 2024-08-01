import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    console.log(`${process.env.MONGO_URL}/${DB_NAME}`);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(
      `\n Mongodb connected DB host:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("mongoDB connection error", error);
    process.exit(1);
  }
};
export default connectDB;
