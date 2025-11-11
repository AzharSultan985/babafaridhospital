import express from "express";
import InvoiceModel from "../models/InvoiceModel.js";

const router = express.Router();

// ✅ Fetch the latest invoice ID
router.get("/last-invoice-id", async (req, res) => {
  try {
    const lastInvoice = await InvoiceModel.findOne().sort({ InvoiceID: -1 });
    const lastID = lastInvoice ? lastInvoice.InvoiceID : 999; // start before 1000
    res.json({ lastID });
  } catch (error) {
    res.status(500).json({ message: "Error fetching last invoice ID" });
  }
});

export default router;
