import express from "express";
import PharmacyModel from "../models/PharmaMed.js";

const router = express.Router();

// 📌 Fetch medicines (with optional month filtering)
router.get("/fetchpharmacymed", async (req, res) => {
  try {
    const { start, end } = req.query;

    let query = {};

    // ✅ If start & end provided, filter by expiry date
    if (start && end) {
      query.PharmaMedexpireDate = {
        $gte: new Date(start),
        $lt: new Date(end),
      };
    }

    const medicines = await PharmacyModel.find(query);

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
    // console.error("❌ Error fetching medicines:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
