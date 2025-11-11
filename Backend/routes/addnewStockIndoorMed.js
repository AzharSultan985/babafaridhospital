import express from "express";
import IndoorMedModel from "../models/indoorMedDb.js";
import IndoorMedRecordModel from "../models/IndoorMedRecords.js";

const router = express.Router();

router.post("/addnewstockindormed", async (req, res) => {
  try {
    const { medicines } = req.body;

    // 1️⃣ Validate request
    if (!Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No medicines provided in the request.",
      });
    }

    // 2️⃣ Check for missing fields
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

    // 3️⃣ Fetch all existing medicines
    const existingMeds = await IndoorMedModel.find();

    const updatedOrAdded = [];
    const recordsToAdd = [];

    for (const med of medicines) {
      const existing = existingMeds.find(
        (e) => e.Medname.toLowerCase() === med.Medname.toLowerCase()
      );

      if (existing) {
        // ✅ Medicine already exists → update it
        existing.company = med.company;
        existing.expdate = new Date(med.expdate);
        existing.quntity = med.quntity;
        existing.current = Number(med.quntity) + (Number(med.remaining) || 0);
        await existing.save();

        updatedOrAdded.push(existing);

        // Add to record
        recordsToAdd.push({
          Medname: med.Medname,
          company: med.company,
          quntity: med.quntity,
          current: existing.current,
          expdate: existing.expdate,
          date: existing.date,
          AddRecorddate: new Date(),
        });
      } else {
        // ✅ New medicine → add it
        const newMed = new IndoorMedModel({
          Medname: med.Medname,
          company: med.company,
          expdate: new Date(med.expdate),
          date: new Date(),
          quntity: med.quntity,
          current: Number(med.quntity) + (Number(med.remaining) || 0),
        });

        await newMed.save();
        updatedOrAdded.push(newMed);

        // Add to record
        recordsToAdd.push({
          Medname: med.Medname,
          company: med.company,
          quntity: med.quntity,
          current: newMed.current,
          expdate: newMed.expdate,
          date: newMed.date,
          AddRecorddate: new Date(),
        });
      }
    }

    // 4️⃣ Save records to IndoorMedRecordModel
    if (recordsToAdd.length > 0) {
      await IndoorMedRecordModel.insertMany(recordsToAdd);
    }

    res.status(201).json({
      success: true,
      message: "Indoor medicine stock updated successfully.",
      updatedOrAddedCount: updatedOrAdded.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating indoor medicine stock.",
      error: error.message,
    });
  }
});

export default router;
