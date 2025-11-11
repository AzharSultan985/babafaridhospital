import PatientModel from "../models/Patientprofile.js";

const FetchPatientByID = async (req, res) => {
  try {
    const { patientid } = req.query;

    if (!patientid) {
      return res
        .status(400)
        .json({ success: false, message: "Patient ID or Phone Number is required." });
    }

    let patientdata;

    // 🔹 Determine if input is patientID (numeric and length 4) or phone number
    if (!isNaN(patientid) && patientid.length === 4) {
      patientdata = await PatientModel.find({ patientID: Number(patientid) });
    } else {
      patientdata = await PatientModel.find({ phone: patientid });
    }

    if (!patientdata || patientdata.length === 0) {
      return res.status(404).json({ success: false, message: "Patient not found." });
    }

    res.status(200).json({
      success: true,
      count: patientdata.length,
      data: patientdata,
    });
  } catch (error) {
    console.error("❌ Error fetching patient data:", error);
    res.status(500).json({ success: false, message: "Server error while fetching data." });
  }
};

export default FetchPatientByID;
