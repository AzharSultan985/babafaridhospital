import express from "express";
import PatientModel from "../models/Patientprofile.js";

const router = express.Router();

/**
 * Fetch Single Patient By patientID
 * Returns full profile for admin panel
 */
router.get("/fetch-single-patient/:id", async (req, res) => {
  try {
      const id = Number(req.params.id);
// console.log('id',id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required.",
      });

    }

    // Convert ID to number and search
    const patient = await PatientModel.findOne({
      patientID: Number(id),
    })
      .populate("pharmacyInvoices") // to show full invoice data
      .lean();
// console.log(patient);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    res.status(200).json({
      success: true,
      patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
});

export default router;
