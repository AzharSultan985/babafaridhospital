import express from "express";
import InvoiceModel from "../models/InvoiceModel.js";
import PatientModel from "../models/Patientprofile.js";

const router = express.Router();

// ✅ Save Invoice to Database Only
router.post("/saveinvoice", async (req, res) => {
  try {
    const { InvoiceDetails } = req.body;
// console.log(InvoiceDetails.PatientID);

    if (!InvoiceDetails) {
      return res
        .status(400)
        .json({ success: false, message: "No invoice details provided" });
    }
//console.log(" InvoiceDetails.patientID", InvoiceDetails.PatientID);
 // 1️⃣ Find patient using numeric patientID
    const patient = await PatientModel.findOne({
      patientID: InvoiceDetails.PatientID,
    });

    // ✅ Create invoice in DB
    const newInvoice = new InvoiceModel({
      BillData: InvoiceDetails.BillData,
      date: InvoiceDetails.date,
      InvoiceID: InvoiceDetails.InvoiceID,
       patientId: InvoiceDetails.PatientID,

      medicines: InvoiceDetails.medicines.map((m) => ({
        id: m.id,
        Medname: m.Medname,
        PricePerTablet: m.PricePerTablet,
        PriceOFMedPerBuy: m.PriceOFMedPerBuy,
        quantity: m.quantity,
      })),
    });

    await newInvoice.save();
// 3️⃣ Push Invoice ObjectId into patient profile
    patient.pharmacyInvoices.push(newInvoice._id);

    // 4️⃣ Save patient record
    await patient.save();
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
