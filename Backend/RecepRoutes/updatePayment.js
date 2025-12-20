import express from "express";
import PatientModel from "../models/Patientprofile.js";

const router = express.Router();

// ✅ Update Payment Route
router.put("/update-payment/:patientID", async (req, res) => {
  try {
    const { patientID } = req.params;
    const { status, received_payment } = req.body;

    if (!patientID) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required.",
      });
    }

    // Find patient by ID
    const patient = await PatientModel.findOne({ patientID: Number(patientID) });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    // --- Update payment info safely ---
    if (status) {
      patient.payment.paymentstatus = status;
    }

    if (received_payment !== undefined) {
      const received = Number(received_payment);
const TotalRecivedPayment=(patient.payment.received_payment + received)

      patient.payment.received_payment = TotalRecivedPayment;
      patient.payment.pending_payment =
        patient.payment.total_payment - TotalRecivedPayment;
    }

    // Save the updates
    await patient.save();

    res.status(200).json({
      success: true,
      message: "Payment details updated successfully.",
      patient,
    });
  } catch (error) {
    ////console.error("❌ Error updating payment:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
});

export default router;