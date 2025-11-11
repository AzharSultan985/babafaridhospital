import IndoorStaffAuthModel from "../models/indoorstaffdb.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from "cors";



dotenv.config();
const 

router = express.Router();
router.use(cookieParser());




// ✅ Staff Login
router.post("/loginstaffindoor", async (req, res) => {
  try {
    const { username, password } = req.body;

    const staff = await IndoorStaffAuthModel.findOne({ username });
    if (!staff) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: staff._id, role: staff.role },
      process.env.JWT_SECRET_Staff_Indoor,
      { expiresIn: "1h" }
    );

    res.cookie("S_I_token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "lax",
      maxAge: 1 * 60 * 60 * 1000

    });

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/staffindoorverify", (req, res) => {
  if (req.cookies.S_I_token) {
    try {
      const decoded = jwt.verify(req.cookies.S_I_token, process.env.JWT_SECRET_Staff_Indoor);
      return res.json({ loggedIn: true, user: decoded });
    } catch {
      return res.json({ loggedIn: false });
    }
  } else {
    res.json({ loggedIn: false  });
  }
});

export default router;
