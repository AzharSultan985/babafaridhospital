import express from "express";
import ReceptionStaffModel from "../models/receptionStaffUsers.js";

const router = express.Router();

// POST /api/add-reception-user
router.post("/add-reception-user", async (req, res) => {
  try {
    const { id, name, address, shiftStart, shiftEnd } = req.body;

    // Validate required fields
    if (!id || !name || !address || !shiftStart || !shiftEnd) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if ID already exists
    const existingStaff = await ReceptionStaffModel.findOne({ id });
    if (existingStaff) {
      return res.status(400).json({ success: false, message: "Reception staff ID already exists" });
    }

    // Create new reception staff
    const newStaff = new ReceptionStaffModel({
      id,
      name,
      address,
      shiftStart,
      shiftEnd,
    });

    const savedStaff = await newStaff.save();
    res.status(201).json({ success: true, data: savedStaff });

  } catch (error) {
    //console.error("Error adding reception staff:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
