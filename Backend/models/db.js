import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"

dotenv.config({ path: path.resolve("./.env") });
const connectDB = async () => {

  try {
    
 

    await mongoose.connect("mongodb://127.0.0.1:27017/BabafaridIndooMed", {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
