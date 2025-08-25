import AdminModel from "../models/Admin.js";

import IndoorStaffAuthModel from "../models/indoorstaffdb.js";
import express from "express";
import bcrypt from "bcrypt";



const router = express.Router();


// 🔹 Create Default Admin with Hardcoded Credentials
router.post("/createadmindefault", async (req, res) => {
  try {
    // Hardcoded credentials
    const username = "adminhospital123";        // default username
    const password = "adminhospital@#";    // default password

    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const newAdmin = new AdminModel({
      username,
      password: hashedPassword
    });
    await newAdmin.save();



    return res.status(201).json({
      message: "Default admin created successfully",
      admin: { username, password }, // password included for reference
      
    });

  } catch (error) {
    //console.log.error("❌ Create admin error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

    router.post("/createstaffdefault", async (req, res) => {
      try {
        // Hardcoded credentials
        const username = "indoor_admin";      // default staff username
        const password = "Indoor@12345";      // default staff password
        const role = "staff_indoor";
    
        // Check if staff already exists
        const existingStaff = await IndoorStaffAuthModel.findOne({ username });
        if (existingStaff) {
          return res.status(400).json({ message: "Staff already exists" });
        }
    
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Create staff
        const newStaff = new IndoorStaffAuthModel({
          username,
          password: hashedPassword,
          role
        });
        await newStaff.save();
    
        return res.status(201).json({
          message: "Default indoor staff created successfully",
          staff: { username: newStaff.username, role },
          password // return plain password for reference
        });
    


        
      } catch (error) {
        //console.log.error("❌ Create staff error:", error.message);
        return res.status(500).json({ message: "Server error" });
      }
    });


export default router