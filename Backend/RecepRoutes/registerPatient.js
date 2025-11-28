import DoctorModel from "../models/doctorProfile.js";
import PatientModel from "../models/Patientprofile.js";
import express from "express";

const router = express.Router();


router.post("/patient-register", async (req, res) => {
  try {
    const patientData = req.body;

    // Convert age and fees to numbers if needed
    if (patientData.age) patientData.age = Number(patientData.age);
    if (patientData.fees) patientData.fees = Number(patientData.fees);

    // Fetch doctor info by name
    const doctor = await DoctorModel.findOne({ name: patientData.doctor });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

 
    // Create and save patient
    const newPatient = new PatientModel(patientData);
    const savedPatient = await newPatient.save();

    // Push patient ID to doctor's CheckedPatients array
    doctor.CheckedPatients.push(savedPatient._id);
    await doctor.save();

    res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      data: savedPatient,
    });
  } catch (error) {
    //console.error("Error registering patient:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register patient",
      error: error.message,
    });
  }
});
export default router;  