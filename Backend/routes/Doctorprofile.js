import express from "express";
import DoctorModel from "../models/doctorProfile.js";

const router = express.Router();

// POST /api/add-reception-user
router.post("/add-doctor", async (req, res) => {
  try {
    const {  name, department,fees} = req.body;

    // Validate required fields
    if (  !name || !department ||!fees) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }


    // Create new reception staff
    const NewDoctor = new DoctorModel({
      
      name,
      department,
      fees,
 
    });
    // //console.log(NewDoctor);
    
    const savedDoctor= await NewDoctor.save();
    res.status(201).json({ success: true, data: savedDoctor });

  } catch (error) {
    ////console.error("Error adding reception staff:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
