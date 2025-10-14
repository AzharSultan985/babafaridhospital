import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    // 🧾 Bill Details
    BillData: {
      Total: { type: Number, required: true, min: 0 },
      DicountRate: { type: Number, default: 0, min: 0 },
      NetTotal: { type: Number, required: true, min: 0 },
    },

    // 📅 Date
    date: {
      type: String, // e.g., "13/10/2025"
      required: true,
    },

    // 👨‍⚕️ Patient reference only
    patient: {
      type: String
     
    },
    InvoiceID: {
      type: Number
     
    },

    // 💊 Medicines sold
    medicines: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PharmacyMed",
          required: true,
        },
        Medname: { type: String, required: true },
        PricePerTablet: { type: Number, required: true, min: 0 },
        PriceOFMedPerBuy: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);
export default InvoiceModel;
