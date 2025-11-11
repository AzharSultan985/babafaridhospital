import express from "express";
import IndoorMedModel from "../models/indoorMedDb.js";

const router = express.Router();

// 📌 Fetch medicines for the current month
router.get("/fetchcurrentmonthindoormed", async (req, res) => {
  try {
    const now = new Date();
    // Start of current month (e.g., Oct 1, 2025)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    // Start of next month (e.g., Nov 1, 2025)
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const medicines = await IndoorMedModel.find({
      date: {
        $gte: monthStart,
        $lt: nextMonthStart,
      },
    });

    if (!medicines || medicines.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No medicines found for the current month",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medicines fetched successfully for the current month",
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
