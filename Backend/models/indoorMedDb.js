import mongoose from "mongoose";


const IndoorMedSchema = new mongoose.Schema({
  Medname: String,
  company: String,
  quntity: Number,
  current: Number,
  expdate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,timestamps: true 
  }
});

// ✅ Capitalize model name (convention: singular)
const IndoorMedModel = mongoose.model("IndoorMed", IndoorMedSchema);

export default IndoorMedModel;
