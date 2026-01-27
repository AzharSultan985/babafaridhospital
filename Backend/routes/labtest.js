// routes/labTests.js
import express from "express";
import LabTest from "../models/LabTest.js"; // Adjust path as needed
import PatientModel from "../models/Patientprofile.js";

const router = express.Router();

// ✅ GET ALL LAB TESTS
router.get("/fetch-tests", async (req, res) => {
  try {
    const tests = await LabTest.find().sort({ createdAt: -1 });
    res.json({ success: true, tests });
  } catch (error) {
    console.error("Error fetching lab tests:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ ADD NEW LAB TEST
router.post("/create-test", async (req, res) => {
  try {
    const { name, rate } = req.body;
    
    if (!name || !rate || rate < 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Name and valid rate (≥ 0) are required" 
      });
    }

    const existingTest = await LabTest.findOne({ name: name.toLowerCase().trim() });
    if (existingTest) {
      return res.status(400).json({ 
        success: false, 
        message: "Test with this name already exists" 
      });
    }

    const newTest = new LabTest({ 
      name: name.trim(), 
      rate: parseInt(rate) 
    });
    await newTest.save();

    res.status(201).json({ success: true, test: newTest });
  } catch (error) {
    console.error("Error adding lab test:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ DELETE LAB TEST
router.delete("/:id", async (req, res) => {
  try {
    const test = await LabTest.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).json({ success: false, message: "Test not found" });
    }
    res.json({ success: true, message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting lab test:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});
// POST /api/lab-invoice - Save lab invoice
// POST /api/lab-invoice
// ✅ CORRECTED POST /lab-invoice route
router.post('/lab-invoice', async (req, res) => {
  try {
    const { patientId, tests, totalAmount, handledBy, invoiceDate } = req.body;
    
    const patient = await PatientModel.findOne({ patientID: parseInt(patientId) });
    if (!patient) {
      return res.status(404).json({ success: false, message: `Patient ${patientId} not found` });
    }

    if (!patient.labInvoices) patient.labInvoices = [];
    
    const labInvoice = {
      invoiceNo: Date.now(),
      tests, totalAmount, handledBy, invoiceDate,
      createdAt: new Date()
    };
    
    patient.labInvoices.push(labInvoice);
    await patient.save();

    res.json({ success: true, patient });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});



export default router;
