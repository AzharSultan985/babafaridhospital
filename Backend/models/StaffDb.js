import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
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

const StaffAuthModel = mongoose.model("Staff", StaffSchema);

export default StaffAuthModel;
