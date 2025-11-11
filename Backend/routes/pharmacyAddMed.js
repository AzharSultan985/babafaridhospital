import express from "express";
import PharmacyModel from "../models/PharmaMed.js";

const router = express.Router();

// ✅ Add New Medicine
router.post("/addpharmamed", async (req, res) => {
  try {
    const {
      PharmaMedname,
      PharmaMedcompany,
      PharmaMedstock,
      PharmaMedTablets,
      PharmaMedprice,
      PharmaMedexpireDate,
    } = req.body;

    // 🔹 Calculate values properly
    const TotalTablets = PharmaMedstock * PharmaMedTablets;  
    const TotalPriceOFStockMedicine = PharmaMedstock * PharmaMedprice;  
    
const PricePerMed = Math.round((PharmaMedprice / PharmaMedTablets) * 100) / 100;

    const newMedicine = new PharmacyModel({
      PharmaMedname,
      PharmaMedcompany,
      PharmaMedstock,
      PharmaMedTablets,
      PharmaMedprice,
      available: TotalTablets,
      PharmaMedexpireDate,
      TotalTablets,
      TotalPriceOFStockMedicine,
      PricePerMed,
    });

    await newMedicine.save();

    res.status(201).json({
      success: true,
      message: "✅ Medicine added successfully",
      data: newMedicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Error adding medicine",
      error: error.message,
    });
  }
});

export default router;
