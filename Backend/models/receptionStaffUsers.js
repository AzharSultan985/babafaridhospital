import mongoose from "mongoose";

const ReceptionStaffSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true, // Ensure no duplicates
     
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    shiftStart: {
      type: String, // Store as "HH:MM"
      required: true,
    },
    shiftEnd: {
      type: String, // Store as "HH:MM"
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

const ReceptionStaffModel = mongoose.model("ReceptionStaff", ReceptionStaffSchema);

export default ReceptionStaffModel;
