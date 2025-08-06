import mongoose from "mongoose";


const IndoorMedSchema = new mongoose.Schema({
  Medname: String,
  quntity: String,
  Exp_date: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

// ✅ Capitalize model name (convention: singular)
const IndoorMedModel = mongoose.model("IndoorMed", IndoorMedSchema);

export default IndoorMedModel;
