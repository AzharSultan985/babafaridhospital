import express from "express";
import PharmacyModel from "../models/PharmaMed.js";
import PharmacyRecordModel from "../models/pharmacyStockRecord.js";

const router = express.Router();

// ✅ Add or Update Pharmacy Stock and Record
router.post("/addnewstockpharmamed", async (req, res) => {
  try {
    const { medicines } = req.body;

    if (!Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No medicines provided in the request.",
      });
    }

    // 1️⃣ Fetch existing main and record medicines
    const [existingMeds, existingRecords] = await Promise.all([
      PharmacyModel.find(),
      PharmacyRecordModel.find(),
    ]);

    const updatedOrAdded = [];
    const recordsToAdd = [];

    for (const m of medicines) {
      const expDate = new Date(m.PharmaMedexpireDate);
      const stock = Number(m.PharmaMedstock) || 0;
      const tabletsPerBox = Number(m.PharmaMedTablets) || 0;
      const pricePerBox = Number(m.PharmaMedprice) || 0;
      const remaining = Number(m.remainingquntity) || 0;

      const TotalTablets = stock * tabletsPerBox;
      const TotalPriceOFStockMedicine = stock * pricePerBox;
      const PricePerMed = Math.round((pricePerBox / tabletsPerBox) * 100) / 100;
      const FinalAvailable = TotalTablets + remaining;

      // 🔍 Check if medicine already exists in main DB
      const existing = existingMeds.find(
        (e) => e.PharmaMedname.toLowerCase() === m.PharmaMedname.toLowerCase()
      );

      if (existing) {
        // ✅ Update existing main record
        existing.PharmaMedcompany = m.PharmaMedcompany;
        existing.PharmaMedstock = stock;
        existing.PharmaMedTablets = tabletsPerBox;
        existing.PharmaMedprice = pricePerBox;
        existing.PharmaMedexpireDate = expDate;
        existing.available = FinalAvailable;
        existing.TotalTablets = TotalTablets;
        existing.TotalPriceOFStockMedicine = TotalPriceOFStockMedicine;
        existing.PricePerMed = PricePerMed;
        await existing.save();

        updatedOrAdded.push(existing);

        // 🔍 Check if exists in record DB
        const alreadyInRecord = existingRecords.find(
          (r) =>
            r.PharmaMedname.toLowerCase() === m.PharmaMedname.toLowerCase() &&
            r.PharmaMedcompany.toLowerCase() === m.PharmaMedcompany.toLowerCase()
        );

        if (!alreadyInRecord) {
          // Add to records with empty salesHistory
          recordsToAdd.push({
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
            createdDate: existing.createdAt,
            recordDate: new Date(),
            salesHistory: [],
            monthStats: existing.monthStats || {},
          });
        }
      } else {
        // ✅ Add new medicine to main DB
        const newMed = new PharmacyModel({
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
          date: new Date(),
        });

        await newMed.save();
        updatedOrAdded.push(newMed);

        // ✅ Add corresponding record entry (empty salesHistory)
        recordsToAdd.push({
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
          createdDate: newMed.createdAt,
          recordDate: new Date(),
          salesHistory: [],
          monthStats: {},
        });
      }
    }

    // 2️⃣ Insert new records only (avoid duplicates)
    if (recordsToAdd.length > 0) {
      await PharmacyRecordModel.insertMany(recordsToAdd);
    }

    res.status(201).json({
      success: true,
      message: "✅ Pharmacy stock updated and recorded successfully.",
      updatedOrAddedCount: updatedOrAdded.length,
      newRecordsAdded: recordsToAdd.length,
    });
  } catch (error) {
    console.error("❌ Error updating stock:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating pharmacy stock.",
      error: error.message,
    });
  }
});

export default router;
