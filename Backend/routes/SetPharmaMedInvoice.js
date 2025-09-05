import express from "express";
import PharmacyModel from "../models/PharmaMed.js";

const router = express.Router();

// ✅ Update stock after invoice
router.post("/setquntitybypharmacyinvoice", async (req, res) => {
  try {
    const { medicineDetails } = req.body; // array of {id, quantity}
    // console.log("📩 Received medicines:", medicineDetails);

    for (const med of medicineDetails) {
      await PharmacyModel.updateOne(
        { _id: med.id },
        { $inc: { available: -med.quantity } } // ✅ decrease available stock
      );
    }

    res.json({ success: true, message: "Stock updated successfully" });
  } catch (err) {
    // console.error("❌ Error updating stock:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
