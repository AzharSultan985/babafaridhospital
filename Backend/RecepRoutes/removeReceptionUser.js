import express from "express";
import ReceptionStaffModel from "../models/receptionStaffUsers.js";

const router = express.Router();

router.delete("/remove-receptionUser/:id", async (req, res) => {
  try {
    const { id } = req.params; // <-- fix: use lowercase 'id'
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required.",
      });
    }

    const RecepUser = await ReceptionStaffModel.findOneAndDelete({ id: Number(id) });
    if (!RecepUser)
      return res.status(404).json({ success: false, message: "Reception User not found." });

    res.status(200).json({
      success: true,
      message: "Reception User Removed successfully.",
    });
  } catch (error) {
    //console.error("❌ Error removing Reception User:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while removing Reception User.",
    });
  }
});

export default router;
