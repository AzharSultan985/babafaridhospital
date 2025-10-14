import express from "express";
import PharmacyModel from "../models/PharmaMed.js";

const router = express.Router();

// ✅ Add New Stock (Bulk Update for Current Month)
router.post("/addnewstockpharmamed", async (req, res) => {
  try {
    const { medicines } = req.body;
    //console.log("📦 Incoming medicines:", medicines);

    // 1️⃣ Validate input
    if (!Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No medicines provided in the request.",
      });
    }

    // 2️⃣ Prepare data with proper calculations
    const formattedMeds = medicines.map((m) => {
      // Convert expiry date to proper Date
      const expDate = new Date(m.PharmaMedexpireDate );

      // Numeric conversion
      const stock = Number(m.PharmaMedstock) || 0; // Boxes
      const tabletsPerBox = Number(m.PharmaMedTablets) || 0; // Tablets per box
      const pricePerBox = Number(m.PharmaMedprice) || 0;
      const remaining = Number(m.remainingquntity) || 0;

      // Calculations
      const TotalTablets = stock * tabletsPerBox;
      const TotalPriceOFStockMedicine = stock * pricePerBox;
      const PricePerMed = Math.round((pricePerBox / tabletsPerBox) * 100) / 100;

      // Add remaining tablets from last month
      const FinalAvailable = TotalTablets + remaining;

      return {
        PharmaMedname: m.PharmaMedname,
        PharmaMedcompany: m.PharmaMedcompany,
        PharmaMedstock: stock,
        PharmaMedTablets: tabletsPerBox,
        PharmaMedprice: pricePerBox,
        PharmaMedexpireDate: expDate,
        available: FinalAvailable,
        TotalTablets,
        TotalPriceOFStockMedicine,
        PricePerMed,
      };
    });

    // 3️⃣ Bulk insert into MongoDB
    const savedMeds = await PharmacyModel.insertMany(formattedMeds);
    //console.log("✅ Saved medicines:", savedMeds.length);

    res.status(201).json({
      success: true,
      message: "✅ Medicines added successfully with calculated stock values.",
      count: savedMeds.length,
    });
  } catch (error) {
    //console.error("❌ Error adding pharmacy stock:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding medicines.",
      error: error.message,
    });
  }
});

export default router;
