import express from "express";
import PharmacyModel from "../models/PharmaMed.js";

const router = express.Router();

// ✅ Simple fetch — no filters, just return all medicines
router.get("/fetchpharmacymed", async (req, res) => {
  try {
    const medicines = await PharmacyModel.find().sort({ date: -1 });

    if (!medicines || medicines.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No medicines found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medicines fetched successfully",
      data: medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
