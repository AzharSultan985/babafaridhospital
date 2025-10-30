import express from "express";
import IndoorMedModel from "../models/indoorMedDb.js";

const router = express.Router();

router.post("/updatestockindormed", async (req, res) => {
  try {
    const { medicines } = req.body;

    if (!Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No medicines provided in the request.",
      });
    }

    let updatedOrCreated = [];

    for (const med of medicines) {
      const { Medname, company, quntity, remaining } = med;

      if (!Medname || !company || !quntity) continue;

      // 🔹 Find if the medicine already exists for this month
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      const existingMed = await IndoorMedModel.findOne({
        Medname,
        company,
        date: { $gte: monthStart, $lt: nextMonthStart },
      });

      if (existingMed) {
        // 🔸 Update existing record
        existingMed.quntity = Number(existingMed.quntity) + Number(quntity);
        existingMed.current = Number(existingMed.current) + Number(quntity);
        existingMed.remaining = existingMed.current;
        existingMed.lastUpdated = new Date();

        const saved = await existingMed.save();
        updatedOrCreated.push(saved);
      } else {
        // 🔸 Create new medicine record
        const newMed = new IndoorMedModel({
          Medname,
          company,
          quntity: Number(quntity),
          current: Number(quntity) + (Number(remaining) || 0),
          remaining: Number(quntity) + (Number(remaining) || 0),
          date: new Date(),
        });

        const saved = await newMed.save();
        updatedOrCreated.push(saved);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Stock updated or refilled successfully.",
      count: updatedOrCreated.length,
      data: updatedOrCreated,
    });
  } catch (error) {
    console.error("❌ Error updating indoor medicines:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating medicines.",
      error: error.message,
    });
  }
});

export default router;
