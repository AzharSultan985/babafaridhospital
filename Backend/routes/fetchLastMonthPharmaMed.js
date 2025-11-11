import express from "express";
import PharmacyModel from "../models/PharmaMed.js";

const router = express.Router();

// 📌 Fetch medicines for last month
router.get("/fetchlastmonthpharmacymed", async (req, res) => {
  try {
    const now = new Date();
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);

    const medicines = await PharmacyModel.find({
      date: {
        $gte: lastMonthStart,
        $lt: lastMonthEnd,
      },
    });

    if (!medicines || medicines.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No medicines found for last month",
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
