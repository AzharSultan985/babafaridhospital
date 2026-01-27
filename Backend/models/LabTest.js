// models/LabTest.js
import mongoose from "mongoose";


const labTestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Test name is required"],
    trim: true,
    unique: true
  },
  rate: {
    type: Number,
    required: [true, "Rate is required"],
    min: [0, "Rate cannot be negative"]
  }
}, {
  timestamps: true
});

const labmodel = mongoose.model("LabTest", labTestSchema);
export default labmodel