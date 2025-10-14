import express from "express";
import PharmacyModel from "../models/PharmaMed.js";

const router = express.Router();

// 📌 Fetch medicines with optional month query, fallback to last month
router.get("/fetchpharmacymed", async (req, res) => {
  try {
    const { start, end } = req.query; // Optional query parameters
    let medicines = [];

    if (start && end) {
      // ✅ Fetch medicines according to provided query month
      medicines = await PharmacyModel.find({
        date: {
          $gte: new Date(start),
          $lt: new Date(end),
        },
      });
    } else {
      // Default: current month
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      medicines = await PharmacyModel.find({
        date: {
          $gte: currentMonthStart,
          $lt: currentMonthEnd,
        },
      });

      // Fallback: last month if current month empty
      if (!medicines || medicines.length === 0) {
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);

        medicines = await PharmacyModel.find({
          date: {
            $gte: lastMonthStart,
            $lt: lastMonthEnd,
          },
        });
      }
    }

    if (!medicines || medicines.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No medicines found for the requested period",
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
