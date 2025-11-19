import mongoose from "mongoose";

const RecepStaffSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    
  }
});

const RecepStaffAuthModel = mongoose.model("RecepUser", RecepStaffSchema);

export default RecepStaffAuthModel;
