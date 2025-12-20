import mongoose from "mongoose";

const PharmacySchema = new mongoose.Schema(
  {
    PharmaMedname: {
      type: String,
      required: true,
      trim: true,
    },
    PharmaMedcompany: {
      type: String,
      required: true,
      trim: true,
    },
    PharmaMedstock: {
      type: Number,
      required: true,
      min: 0,
    },
    PharmaMedTablets: {
      type: Number,
      required: true,
      min: 1,
    },
    PharmaMedprice: {
      type: Number,
      required: true,
      min: 0,
    },
    available: {
      type: Number,
      default: 0,
      min: 0,
    },
    PharmaMedexpireDate: {
      type: Date,
      required: true,
    },
    TotalTablets: {
      type: Number,
      default: 0,
      min: 0,
    },
    TotalPriceOFStockMedicine: {
      type: Number,
      default: 0,
      min: 0,
    },
    PricePerMed: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ✅ Date when this record was added
    date: {
      type: Date,
      default: Date.now,
    },

    // ✅ Sales History (daily / voucher based)
    salesHistory: [
      {
        date: { type: Date, required: true },
        voucherNo: { type: String, required: true },
        soldQuantity: { type: Number, required: true, min: 1 },
        totalSale: { type: Number, required: true, min: 0 },
      },
    ],

    // ✅ Monthly summary (auto-updated when new sale happens)
    monthStats: {
      type: Map,
      of: {
        totalSold: { type: Number, default: 0 },
        totalRevenue: { type: Number, default: 0 },
      },
      default: {},
    },
user:String
  },
  { timestamps: true }
);

const PharmacyModel = mongoose.model("PharmacyMed", PharmacySchema);

export default PharmacyModel;
