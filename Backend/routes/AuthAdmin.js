import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AdminModel from "../models/Admin.js";
import cookieParser from "cookie-parser";

dotenv.config();
const router = express.Router();
router.use(cookieParser());



// 🔹 Admin Login Route
router.post("/loginadmin", async (req, res) => {
  const { username, password } = req.body;
   

  try {
    // Find admin in DB
    const admin = await AdminModel.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare entered password with hashed one
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send JWT in HTTP-only cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false, // set to true if using https
      sameSite: "lax",
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    return res.status(200).json({ message: "Login successful" });

  } catch (error) {
    //console.log.error("❌ Login error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Middleware to protect admin routes
export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
router.get("/checkAuth", (req, res) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    res.status(401).json({ loggedIn: false });
  }
});


export default router;
