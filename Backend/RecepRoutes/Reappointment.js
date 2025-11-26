import express from "express";
import PatientModel from "../models/Patientprofile.js";

const router = express.Router();

/**
 * Reappointment Route
 * Adds a new appointment entry to Appointment[]
 */
router.put("/reappointment-patient/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    const { fees, reAppHandleby } = req.body;

    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: "Patient ID or phone number is required.",
      });
    }

    if (!fees) {
      return res.status(400).json({
        success: false,
        message: "Fees is required.",
      });
    }

    // Find patient by either ID or phone
    const patient = await PatientModel.findOne({
      $or: [
        { patientID: Number(identifier) },
        { phone: identifier }
      ],
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    // Determine next appointment count
    const nextNo = patient.Appointment.length + 1;

    // Push new reappointment entry
    patient.Appointment.push({
      NoofTime: nextNo,
      fees: Number(fees),
      handledBy: reAppHandleby || "Reception",
    });

    await patient.save();

    res.status(200).json({
      success: true,
      message: "Reappointment added successfully.",
      patient,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
});

export default router;
