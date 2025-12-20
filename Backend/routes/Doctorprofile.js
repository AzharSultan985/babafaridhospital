import express from "express";
import DoctorModel from "../models/doctorProfile.js";
import bcrypt from "bcrypt";

const router = express.Router();

// POST /api/add-reception-user
router.post("/add-doctor", async (req, res) => {
  try {
    const {  name, department,fees } = req.body;

    // Validate required fields
    if (  !name || !department ||!fees) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

const username= 'admin'+ name 
const password= name +'@#'

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    const NewDoctor = new DoctorModel({
      name,
      department,
      fees,
 Auth:{
  username,
  password:hashedPassword
 }
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
