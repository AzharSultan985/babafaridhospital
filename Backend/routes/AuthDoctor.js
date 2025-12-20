import DoctorModel from "../models/doctorProfile.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from "cors";



dotenv.config();
const router = express.Router();  // ❌ FIXED: Missing word
router.use(cookieParser());


// ✅ Staff Login
router.post("/doctor_login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const doctor = await DoctorModel.findOne({ "Auth.username": username }).populate('CheckedPatients')
      .populate('OperatedPatients')
      
    if (!doctor) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, doctor.Auth.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET_Auth_Doctor,
      { expiresIn: "1h" }
    );

    res.cookie("Doctor_token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "lax",
      maxAge: 1 * 60 * 60 * 1000

    });

    res.status(200).json({ message: "Login successful" ,doctor},
    );

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/verifydoctor", (req, res) => {
  if (req.cookies.Doctor_token) {
    try {
      const decoded = jwt.verify(req.cookies.Doctor_token, process.env.JWT_SECRET_Auth_Doctor);
      return res.json({ loggedIn: true, user: decoded });
    } catch {
      return res.json({ loggedIn: false });
    }
  } else {
    res.json({ loggedIn: false  });
  }
});

router.get("/refresh_doctor", async (req, res) => {
  try {
    const token = req.cookies.Doctor_token;
    if (!token) return res.status(401).json({ error: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_Auth_Doctor);
    const doctor = await DoctorModel.findById(decoded.id)
populate('CheckedPatients')
      .populate('OperatedPatients').select('-Auth.password'); 
    res.json({ doctor });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
