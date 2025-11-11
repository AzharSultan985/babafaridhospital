import mongoose from "mongoose";

const PharmacyRecordSchema = new mongoose.Schema(
  {
    PharmaMedname: { type: String, required: true, trim: true },
    PharmaMedcompany: { type: String, required: true, trim: true },
    PharmaMedstock: { type: Number, required: true, min: 0 },
    PharmaMedTablets: { type: Number, required: true, min: 1 },
    PharmaMedprice: { type: Number, required: true, min: 0 },
    available: { type: Number, default: 0, min: 0 },
    PharmaMedexpireDate: { type: Date, required: true },
    TotalTablets: { type: Number, default: 0, min: 0 },
    TotalPriceOFStockMedicine: { type: Number, default: 0, min: 0 },
    PricePerMed: { type: Number, default: 0, min: 0 },

    // ✅ Dates
    createdDate: { type: Date, required: true }, // when the medicine was originally created
    recordDate: { type: Date, default: Date.now }, // when it moved to record

    // ✅ Sales History
    salesHistory: [
      {
        date: { type: Date, required: true },
        voucherNo: { type: String, required: true },
        soldQuantity: { type: Number, required: true, min: 1 },
        totalSale: { type: Number, required: true, min: 0 },
      },
    ],

    // ✅ Monthly Summary
    monthStats: {
      type: Map,
      of: {
        totalSold: { type: Number, default: 0 },
        totalRevenue: { type: Number, default: 0 },
      },
      default: {},
    },
  },
  { timestamps: true }
);

const PharmacyRecordModel = mongoose.model("PharmacyRecord", PharmacyRecordSchema);
export default PharmacyRecordModel;
