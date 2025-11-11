import express from "express";
import mongoose from "mongoose";
import InvoiceModel from "../models/InvoiceModel.js";
import PharmacyModel from "../models/PharmaMed.js";

const router = express.Router();

router.put("/update-return/:invoiceID", async (req, res) => {
  try {
    const { invoiceID } = req.params;
    const { returnedMedicines, BillData, refillData } = req.body;

    const invoice = await InvoiceModel.findOne({ InvoiceID: invoiceID });
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    if (returnedMedicines) invoice.medicines = returnedMedicines;
    if (BillData) invoice.BillData = BillData;
    invoice.status = "Updated";
    await invoice.save();

    if (Array.isArray(refillData) && refillData.length > 0) {
      for (const item of refillData) {
        const medId = item.id || item._id; // use `id` from invoice if exists
        const refillQty = Number(item.refillQty || 0);

        if (!medId || !refillQty) continue;
        if (!mongoose.Types.ObjectId.isValid(medId)) {
          console.warn(`⚠️ Invalid ObjectId: ${medId}`);
          continue;
        }

        const medicine = await PharmacyModel.findById(medId);
        if (!medicine) {
          console.warn(`⚠️ Medicine not found for ID: ${medId}`);
          continue;
        }

        medicine.available = (medicine.available || 0) + refillQty;
        await medicine.save();
        ////console.log(`✅ Refilled ${medicine.PharmaMedname}: +${refillQty} (Now ${medicine.available})`);
      }
    }

    res.status(200).json({ success: true, message: "Invoice and refill updated", invoice });
  } catch (error) {
    console.error("❌ Error updating invoice/refill:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
