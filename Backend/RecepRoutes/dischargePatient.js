import express from "express";
import PatientModel from "../models/Patientprofile.js";

const router = express.Router();

router.put("/discharge-patient/:patientID", async (req, res) => {
  try {
    const { patientID } = req.params;
    const { dischargedBy } = req.body;

    if (!patientID || !dischargedBy) {
      return res.status(400).json({
        success: false,
        message: "Patient ID and dischargedBy are required.",
      });
    }

    const patient = await PatientModel.findOne({ patientID: Number(patientID) });
    if (!patient)
      return res.status(404).json({ success: false, message: "Patient not found." });

    // ✅ Update discharge information
    patient.discharge.isdischarge = true;
    patient.discharge.dischargedAt = new Date();
    patient.discharge.dischargedBy = dischargedBy;

  
    await patient.save();

    res.status(200).json({
      success: true,
      message: "Patient discharged successfully.",
      patient,
    });
  } catch (error) {
    //console.error("❌ Error discharging patient:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while discharging patient.",
    });
  }
});

export default router;
