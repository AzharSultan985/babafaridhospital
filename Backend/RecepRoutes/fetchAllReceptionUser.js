import ReceptionStaffModel from "../models/receptionStaffUsers.js";


const FetchAllReceptionUser = async (req, res) => {
  try {
    // Fetch all patients and sort by newest first (descending order by _id)
    const ReceptionUserdata = await ReceptionStaffModel.find().sort({ _id: -1 });

    if (!ReceptionUserdata || ReceptionUserdata.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Reception User  found." });
    }

    res.status(200).json({
      success: true,
      data: ReceptionUserdata,
    });
  } catch (error) {
    ////console.error("❌ Error fetching Reception User data:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching data.",
    });
  }
};

export default FetchAllReceptionUser;
