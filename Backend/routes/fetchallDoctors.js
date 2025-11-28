import DoctorModel from "../models/doctorProfile.js";

const FetchAllDoctors = async (req, res) => {
  try {
const Doctors = await DoctorModel.find()
  .sort({ _id: -1 })
  .populate({
    path: "CheckedPatients",
    select: "patientID Appointment"
  })
  .populate({
    path: "OperatedPatients",
    select: "patientID admission payment"
  });


    if (!Doctors || Doctors.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Doctors found." });
    }

    res.status(200).json({
      success: true,
      data: Doctors,
    });
  } catch (error) {
    //console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching data.",
    });
  }
};

export default FetchAllDoctors;
