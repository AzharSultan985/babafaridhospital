import express from "express";
import DoctorModel from "../models/doctorProfile.js";

const router = express.Router();

router.delete("/remove-doctor/:id", async (req, res) => {
  try {
    const { id } = req.params; // <-- fix: use lowercase 'id'
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required.",
      });
    }
    const doctor = await DoctorModel.findOneAndDelete({ _id: id });
    if (!doctor)
      return res.status(404).json({ success: false, message: "doctor  not found." });

    res.status(200).json({
      success: true,
      message: "Doctor Removed successfully.",
    });
  } catch (error) {
    ////console.error("❌ Error removing Reception User:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while removing doctor .",
    });
  }
});

export default router;
