import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // console.log("✅ Mongo URI from env:", process.env.MONGO_URI); // 👈 LOG this
await mongoose.connect('mongodb://localhost:27017/hospitalDB');

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
  }
};

export default connectDB;
