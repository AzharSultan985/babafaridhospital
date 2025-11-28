import PatientModel from "../models/Patientprofile.js";

const FetchAllPatient = async (req, res) => {
  try {
    // Fetch all patients and sort by newest first (descending order by _id)
    const patientdata = await PatientModel.find().sort({ _id: -1 });

    if (!patientdata || patientdata.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No patients found." });
    }

    res.status(200).json({
      success: true,
      data: patientdata,
    });
  } catch (error) {
    ////console.error("❌ Error fetching patient data:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching data.",
    });
  }
};

export default FetchAllPatient;
