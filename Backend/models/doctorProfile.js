import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  fees: { type: String, required: true, trim: true },

  // Array of patients this doctor has checked
  CheckedPatients: [
     {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
     }
  ],

  // Array of patients this doctor has operated
  OperatedPatients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    }
  ],

 
  createdAt: { type: Date, default: Date.now },
});

const DoctorModel = mongoose.model("DoctorsProfile", DoctorSchema);
export default DoctorModel;
