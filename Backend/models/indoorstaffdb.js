import mongoose from "mongoose";

const IndoorStaffSchema = new mongoose.Schema({
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
    default: "indoor-staff"
  }
});

const IndoorStaffAuthModel = mongoose.model("IndoorStaff", IndoorStaffSchema);

export default IndoorStaffAuthModel;
