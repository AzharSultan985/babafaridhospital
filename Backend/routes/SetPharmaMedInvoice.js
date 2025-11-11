import express from "express";
import PharmacyModel from "../models/PharmaMed.js";

const router = express.Router();

// ✅ Update stock + sales records when invoice created
router.post("/setquntitybypharmacyinvoice", async (req, res) => {
  try {
    const { medicineDetails, voucherNo } = req.body; 
    // medicineDetails = [{ id, quantity, PricePerTablet, PriceOFMedPerBuy }]
    // voucherNo can be invoice number or generated ID

    if (!medicineDetails || medicineDetails.length === 0) {
      return res.status(400).json({ success: false, message: "No medicine data provided" });
    }

    const currentDate = new Date();
    const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`; 
    // e.g., "2025-10"

    // Loop through each medicine from invoice
    for (const med of medicineDetails) {
      const medicine = await PharmacyModel.findById(med.id);

      if (!medicine) continue; // skip if not found

      // 1️⃣ Decrease available stock
      medicine.available = Math.max(0, (medicine.available || 0) - med.quantity);

      // 2️⃣ Record sale history
      medicine.salesHistory.push({
        date: currentDate,
        voucherNo: voucherNo || `INV-${Date.now()}`,
        soldQuantity: med.quantity,
        totalSale: med.PricePerTablet * med.quantity,
      });

      // 3️⃣ Update monthly summary
      const currentMonthStats = medicine.monthStats.get(monthKey) || {
        totalSold: 0,
        totalRevenue: 0,
      };

      currentMonthStats.totalSold += med.quantity;
      currentMonthStats.totalRevenue += med.PricePerTablet * med.quantity;

      medicine.monthStats.set(monthKey, currentMonthStats);

      await medicine.save();
    }

    res.json({ success: true, message: "Stock, sales, and monthly stats updated successfully" });
  } catch (err) {
    console.error("❌ Error updating medicine data:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
