// routes/invoice.js
import express from "express";
import InvoiceModel from "../models/InvoiceModel.js";

const router = express.Router();

router.put("/update-return/:invoiceID", async (req, res) => {
  try {
    const { invoiceID } = req.params;
    const { returnedMedicines, BillData } = req.body; // must match frontend

    if (!returnedMedicines || !BillData) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const invoice = await InvoiceModel.findOne({ InvoiceID: Number(invoiceID) });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Update fields
    invoice.medicines = returnedMedicines;
    invoice.BillData = BillData;

    await invoice.save();

    res.status(200).json({ message: "Invoice updated successfully", invoice });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
