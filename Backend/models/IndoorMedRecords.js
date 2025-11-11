  import mongoose from "mongoose";

  const IndoorMedRecordSchema = new mongoose.Schema({
    Medname: { type: String, required: true },
    company: { type: String, required: true },
    quntity: { type: Number, required: true },
    current: { type: Number, required: true },
    expdate: { type: Date, required: true }, // expiry or manufacturing date
    date: { type: Date, required: true }, // original creation date (from IndoorMedModel)
    AddRecorddate: { type: Date, default: Date.now }, // record movement date
  });

  const IndoorMedRecordModel = mongoose.model("IndoorMedRecord", IndoorMedRecordSchema);
  export default IndoorMedRecordModel;

