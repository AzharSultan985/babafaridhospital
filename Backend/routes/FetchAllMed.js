import IndoorMedModel from "../models/indoorMedDb.js";

const Fetchallmed = async (req, res) => {
  try {
    const meds = await IndoorMedModel.find();
    res.status(200).json(meds); // ✅ send response
  } catch (err) {
    console.error("Error fetching medicines:", err);
    res.status(500).json({ error: "Server error" }); // ✅ error handling
  }
};

export default Fetchallmed;
