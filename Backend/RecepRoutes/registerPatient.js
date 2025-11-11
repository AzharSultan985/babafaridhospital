import express from "express";
import PatientModel from "../models/Patientprofile.js";

const router = express.Router();

// POST /api/patients/patient-register
router.post("/patient-register", async (req, res) => {
  try {
    const patientData = req.body;

    // Create new patient document
    const newPatient = new PatientModel(patientData);

    // Save to database
    const savedPatient = await newPatient.save();

    res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      data: savedPatient,
    });
  } catch (error) {
    console.error("Error registering patient:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register patient",
      error: error.message,
    });
  }
});

export default router;
