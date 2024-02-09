import mongoose from "mongoose";
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error in connecting to database", error);
  }
};

export default connectdb;
