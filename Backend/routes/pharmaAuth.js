import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import PharmacyUser from "../models/pharmacyuser.js";


const router = express.Router();
router.use(cookieParser());

// 🔹 Default pharmacy user create (only once)
router.post("/createdefaultpharmauser", async (req, res) => {
  try {
    const existing = await PharmacyUser.findOne({ username: "pharmacy123" });
    if (existing) {
      return res.status(400).json({ message: "Default pharmacy already exists" });
    }

    const hashedPassword = await bcrypt.hash("pharmacy@#", 10); // default password
    const user = new PharmacyUser({ username: "pharmacy", password: hashedPassword });
    await user.save();

    res.json({ message: "✅ Default pharmacy user created", user });
  } catch (err) {
    res.status(500).json({ message: "❌ Error creating default pharmacy user", error: err.message });
  }
});

// 🔹 Pharmacy Login
router.post("/pharmalogin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const pharmacy = await PharmacyUser.findOne({ username });
    if (!pharmacy) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, pharmacy.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: pharmacy._id, username: pharmacy.username, role: "pharmacy" },
      process.env.JWT_Pharmacy_SECRET,
      { expiresIn: "1h" }
      
    );

    res.cookie("pharmacyToken", token, {
      httpOnly: true,
      secure: false, // localhost ke liye false rakho, production me true
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🔹 Middleware
export const verifyPharmacy = (req, res, next) => {
  const token = req.cookies.pharmacyToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_Pharmacy_SECRET);
    if (decoded.role !== "pharmacy") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// 🔹 Auth check
router.get("/pharmacycheckAuth", (req, res) => {
  const token = req.cookies.pharmacyToken;
  if (!token) return res.status(401).json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_Pharmacy_SECRET);
    res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    res.status(401).json({ loggedIn: false });
  }
});

export default router;
