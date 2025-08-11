import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // console.log("✅ Mongo URI from env:", process.env.MONGO_URI); // 👈 LOG this
await mongoose.connect('mongodb://127.0.0.1:27017/BabafaridIndooMed');

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
  }
};

export default connectDB;
