import express from "express";
import PharmacyModel from "../models/PharmaMed.js";

const router = express.Router();

// 🔹 Update or Add Current Month Pharmacy Stock
router.post("/updatecurrentpharma_stock", async (req, res) => {
  try {
    const { medicines } = req.body;

    if (!Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No medicines provided in the request.",
      });
    }


    const updatedOrCreated = [];

    for (const med of medicines) {
      const { PharmaMedname, PharmaMedcompany, PharmaMedstock, PharmaMedTablets } = med;

      if (!PharmaMedname || !PharmaMedcompany || !PharmaMedstock || !PharmaMedTablets) continue;

      // ✅ Total tablets = No. of Boxes × No. of Tablets per Box
      const totalQuantity = Number(PharmaMedstock) * Number(PharmaMedTablets);

      // 🔍 Find existing record for this month
      const existingMed = await PharmacyModel.findOne({
        PharmaMedname,PharmaMedcompany, });

      if (existingMed) {
        // 🔸 Update existing record
        existingMed.TotalTablets = Number(existingMed.TotalTablets || 0) + totalQuantity;
        existingMed.available = Number(existingMed.available || 0) + totalQuantity;
        
        const saved = await existingMed.save();
        updatedOrCreated.push(saved);
      } 
    }

    return res.status(200).json({
      success: true,
      message: "Pharmacy stock updated successfully.",
      count: updatedOrCreated.length,
      data: updatedOrCreated,
    });
  } catch (error) {
    console.error("❌ Error updating pharmacy medicines:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating pharmacy medicines.",
      error: error.message,
    });
  }
});

export default router;
