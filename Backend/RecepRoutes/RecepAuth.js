import RecepStaffAuthModel from "../models/recepUer.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const router = express.Router();
router.use(cookieParser());

// ✅ Staff Login - Fixed Version
router.post("/recep-user-login", async (req, res) => {
  try {
    const { username, password } = req.body;
    //////consolelog("Login attempt - username:", username, "password:", password);

    // Check if user exists
    const staff = await RecepStaffAuthModel.findOne({ username: username });
    if (!staff) {
      //////consolelog("❌ User not found:", username);
      return res.status(400).json({ 
        success: false,
        message: "Invalid username or password" 
      });
    }

    //////consolelog("✅ User found:", staff.username, "Role:", staff.role);

    // Verify password
    const isMatch = await bcrypt.compare(password, staff.password);
    //////consolelog("🔑 Password match:", isMatch);
    
    if (!isMatch) {
      //////consolelog("❌ Password incorrect for user:", username);
      return res.status(400).json({ 
        success: false,
        message: "Invalid username or password" 
      });
    }

    // Create token
    const token = jwt.sign(
      { 
        id: staff._id, 
        username: staff.username,
        role: staff.role 
      },
      process.env.JWT_SECRET_Recep_User || "fallback_secret_recep", // Added fallback
      { expiresIn: "1h" }
    );

    // Set cookie with proper configuration - FIXED SYNTAX
    res.cookie("Recep_User_Token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "lax", // FIXED: Added quotes
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
      path: "/"
    });

    //////consolelog('✅ Login successful for:', staff.username);
    //////consolelog('✅ Cookie set: Recep_User_Token');
    
    // Send response without sensitive data
    res.status(200).json({ 
      success: true,
      message: "Login successful", 
    
    });

  } catch (error) {
    //////consoleerror("❌ Login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: error.message 
    });
  }
});

router.get("/recep-user-verify", (req, res) => {
  const token = req.cookies.Recep_User_Token;
  //////consolelog("🔍 Verification check - Token exists:", !!token);
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_Recep_User || "fallback_secret_recep");
      //////consolelog("✅ Token valid for user:", decoded.username);
      return res.json({ 
        loggedIn: true, 
        user: decoded 
      });
    } catch (error) {
      //////consolelog("❌ Token verification failed:", error.message);
      return res.json({ 
        loggedIn: false,
        message: "Token invalid" 
      });
    }
  } else {
    //////consolelog("❌ No token found");
    res.json({ 
      loggedIn: false,
      message: "No token" 
    });
  }
});

// ✅ Add logout route
router.post("/recep-user-logout", (req, res) => {
  res.clearCookie("Recep_User_Token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
  });
  
  //////consolelog('✅ User logged out');
  res.json({ 
    success: true,
    message: "Logged out successfully" 
  });
});

export default router;