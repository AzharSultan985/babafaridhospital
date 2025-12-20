import express from "express";
import PatientModel from "../models/Patientprofile.js";
import DoctorModel from "../models/doctorProfile.js";
import { LogIn } from "lucide-react";

const router = express.Router();

/**
 * Update Admission & Payment for Existing Patient
 * Can find by patientID OR phone number
 */
router.put("/admission-patient/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params; // could be ID or phone
    const { admission, payment } = req.body;
//console.log("admission.operating_doctorName",admission.operating_doctorName);

    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: "Patient ID or phone number is required.",
      });
    }

    // --- Find the patient either by ID or phone ---
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

    //console.log('doctor',patient);
    
    // --- Prevent duplicate admission ---
    if (patient.admission?.isadmitted) {
      return res.status(400).json({
        success: false,
        message: "Patient is already admitted.",
      });
    }

    // --- Validate required admission fields ---
    const requiredFields = [
      "department",
      "roomNo",
      "Admission_Type",
      "operating_doctorName",
      "Operating_handledBy",];

    const missing = requiredFields.filter(
      (f) => !admission?.[f] || admission[f].trim() === ""
    );

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(", ")}.`,
      });
    }

    // --- Update only admission and payment fields ---
    if (admission) {
      patient.admission = {
        ...patient.admission,
        ...admission,
        isadmitted: true,
        admittedAt: new Date(),
      };
    }

    if (payment) {
      patient.payment = {
        ...patient.payment,
        ...payment,
      };
    }

    // --- Save updates ---
    await patient.save();

  // Fetch doctor info by name
    const doctor = await DoctorModel.findOne({ name: admission.operating_doctorName });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }


 // Push patient ID to doctor's CheckedPatients array
    doctor.OperatedPatients.push(patient._id);
    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Admission and payment details updated successfully.",
      patient,

    });


  } catch (error) {
    ////console.error("❌ Error updating admission/payment:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
});

export default router;