import mongoose from "mongoose";


const PharmacySchema = new mongoose.Schema({
  PharmaMedname: String,
  PharmaMedcompany: String,
  PharmaMedstock: Number,
  PharmaMedTablets:Number,
  PharmaMedprice: Number,
  available: Number,
  PharmaMedexpireDate: {
    type: Date,
  },
  TotalTablets :Number,
  TotalPriceOFStockMedicine :Number,
  PricePerMed :Number,
  date: {
    type: Date,
    default: Date.now,
  }
});

// ✅ Capitalize model name (convention: singular)
const PharmacyModel = mongoose.model("pharmacyMed", PharmacySchema);

export default PharmacyModel;
