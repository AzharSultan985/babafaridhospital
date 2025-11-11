import express from "express";
import InvoiceModel from "../models/InvoiceModel.js";

const router = express.Router();

// ✅ Save Invoice to Database Only
router.post("/saveinvoice", async (req, res) => {
  try {
    const { InvoiceDetails } = req.body;

    if (!InvoiceDetails) {
      return res
        .status(400)
        .json({ success: false, message: "No invoice details provided" });
    }
//console.log(" InvoiceDetails.patientID", InvoiceDetails.PatientID);

    // ✅ Create invoice in DB
    const newInvoice = new InvoiceModel({
      BillData: InvoiceDetails.BillData,
      date: InvoiceDetails.date,
      InvoiceID: InvoiceDetails.InvoiceID,
       patient: InvoiceDetails.PatientID,
      medicines: InvoiceDetails.medicines.map((m) => ({
        id: m.id,
        Medname: m.Medname,
        PricePerTablet: m.PricePerTablet,
        PriceOFMedPerBuy: m.PriceOFMedPerBuy,
        quantity: m.quantity,
      })),
    });

    await newInvoice.save();

    res.status(201).json({
      success: true,
      message: "Invoice saved successfully",
      invoiceId: newInvoice._id,
    });
  } catch (error) {
    //console.error("❌ Error saving invoice:", error);
    res.status(500).json({
      success: false,
      message: "Server error while saving invoice",
      error: error.message,
    });
  }
});

export default router;
