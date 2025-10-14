import express from "express";
import IndoorMedModel from "../models/indoorMedDb.js";

const router = express.Router();

router.post("/addnewstockindormed", async (req, res) => {
  try {
    const { medicines } = req.body;
    //console.log("📦 Incoming medicines:", medicines);

    // 1️⃣ Validate structure
    if (!Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No medicines provided in the request.",
      });
    }

    // 2️⃣ Validate fields
    const invalid = medicines.find(
      (m) => !m.Medname || !m.company || !m.expdate || !m.quntity
    );
    if (invalid) {
      return res.status(400).json({
        success: false,
        message:
          "All medicine fields are required (Medname, company, expdate, quntity).",
      });
    }

    // 3️⃣ Convert expdate to Date type for MongoDB
    const formattedMeds = medicines.map((m) => ({
      ...m,
      expdate: new Date(m.expdate), // 🔥 convert to Date object
      current: m.current ?? m.quntity,
    }));

    // 4️⃣ Save in bulk
    const savedMeds = await IndoorMedModel.insertMany(formattedMeds);
    //console.log("✅ Saved medicines:", savedMeds.length);

    res.status(201).json({
      success: true,
      message: "Medicines added successfully.",
      count: savedMeds.length,
    });
  } catch (error) {
    //console.error("❌ Error adding indoor medicines:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding medicines.",
      error: error.message,
    });
  }
});

export default router;
