import AdminModel from "../models/Admin.js";

import StaffAuthModel from "../models/StaffDb.js";
import express from "express";
import bcrypt from "bcrypt";
import RecepStaffAuthModel from "../models/recepUer.js";



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

    router.post("/create-indoor-user", async (req, res) => {
      try {
        // Hardcoded credentials
        const username = "indoor_admin";      // default staff username
        const password = "Indoor@12345";      // default staff password
        const role = "staff_indoor";
    
        // Check if staff already exists
        const existingStaff = await StaffAuthModel.findOne({ username });
        if (existingStaff) {
          return res.status(400).json({ message: "Staff already exists" });
        }
    
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Create staff
        const newStaff = new StaffAuthModel({
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
   router.post("/create-recep-user", async (req, res) => {
  try {
    console.log("🚀 Creating reception user...");
    
    // Hardcoded credentials
    const username = "Recepuser";      
    const password = "reception@#";     
    const role = "Reception_User";

    console.log("📝 Attempting to create user:", { username, role });

    // ✅ FIX: Check by USERNAME instead of ROLE
    const existingStaff = await RecepStaffAuthModel.findOne({ username: username });
    if (existingStaff) {
      console.log("❌ User already exists:", existingStaff.username);
      return res.status(400).json({ 
        success: false,
        message: "Reception user already exists" 
      });
    }

    console.log("✅ No existing user found, creating new user...");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🔑 Password hashed successfully");

    // Create staff
    const newStaff = new RecepStaffAuthModel({
      username,
      password: hashedPassword,
      role
    });

    await newStaff.save();
    console.log("✅ Reception user saved to database");

    return res.status(201).json({
      success: true,
      message: "Reception user created successfully",
      user: {
        username: newStaff.username,
        role: newStaff.role,
        password: password // For initial setup only
      }
    });

  } catch (error) {
    console.error("💥 Create reception user error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Server error",
      error: error.message 
    });
  }
});


export default router